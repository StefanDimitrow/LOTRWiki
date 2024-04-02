import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/service/characters-service/characters';
import { CharactersService } from 'src/app/service/characters-service/characters.service';
import { AuthService } from 'src/app/service/authentication/auth.service';
import { ErrorHandlerService } from 'src/app/service/error-handling/errorhandling.service';
import { Subscription, Observer } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit, OnDestroy {
  charactersList: Character[] = [];
  showAddForm: boolean = false;
  errorMessage: string = '';
  userIdSubscription: Subscription | undefined;
  getAllCharactersSubscription: Subscription | undefined;
  charactersObj: Character = {
    id: '',
    name: '',
    titles: '',
    gender: '',
    birth: '',
    death: '',
    culture: '',
    weapons: '',
    actor: '',
    userId: '',
    creatorEmail: '',
  };

  constructor(
    private characterService: CharactersService,
    private auth: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    // Check if the current route is the characters page
    if (this.router.url.includes('/characters')) {
      this.getAllCharacters();
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from subscriptions to prevent memory leaks
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
    if (this.getAllCharactersSubscription) {
      this.getAllCharactersSubscription.unsubscribe();
    }
  }

  getAllCharacters() {
    // Create an observer object
    const observer: Observer<any> = {
      next: (res: any) => {
        this.charactersList = res.map((e: any) => {
          const data = e.payload.doc.data() as Character;
          data.id = e.payload.doc.id;
          return data;
        });
      },
      error: (error) => {
        this.errorHandler.handleError(
          'Error while fetching characters. Please try again later.'
        ); // Use the error handling service
      },
      complete: () => {
        // Unsubscribe after characters are processed
        if (this.getAllCharactersSubscription) {
          this.getAllCharactersSubscription.unsubscribe();
        }
      },
    };

    // Subscribe to getAllCharacters() with the observer
    this.getAllCharactersSubscription = this.characterService
      .getAllCharacters()
      .subscribe(observer);
  }

  addOrUpdateCharacter() {
    // Check if charactersObj is not null
    if (this.charactersObj) {
      // Ensure userID is set before adding or updating
      this.auth.getUserID().subscribe((userId: string | null) => {
        if (userId) {
          this.charactersObj.userId = userId; // Set the userID
          // Fetch the creator's email
          this.auth.getUserEmail().subscribe((email: string | null) => {
            if (email) {
              this.charactersObj.creatorEmail = email; // Set the creator's email
              // If charactersObj has an ID, update the existing character
              if (this.charactersObj.id) {
                this.characterService
                  .updateCharacter(this.charactersObj)
                  .then(() => {
                    console.log('Character updated successfully');
                    this.resetForm();
                  })
                  .catch(() => {
                    this.errorHandler.handleError(
                      'Error updating character. Please try again later.'
                    );
                  });
              } else {
                // Otherwise, add a new character
                this.characterService
                  .addCharacter(this.charactersObj)
                  .then(() => {
                    console.log('Character added successfully');
                    this.resetForm();
                  })
                  .catch(() => {
                    this.errorHandler.handleError(
                      'Error adding character. Please try again later.'
                    );
                  });
              }
            }
          });
        }
      });
    }
  }

  editCharacter(character: Character) {
    // Create an observer object
    const observer: Observer<string | null> = {
      next: (userId: string | null) => {
        if (userId === character.userId) {
          // Set charactersObj to the character being edited
          this.charactersObj = { ...character }; // Copy the character object to prevent direct mutation
          this.showAddForm = true;
        } else {
          if (userId === null) {
            // Handle the case where the user is not authenticated
            this.errorHandler.handleError(
              'You must be logged in to edit characters.'
            );
          } else {
            // Handle the case where the user is logged in but does not own the character
            this.errorHandler.handleError(
              "You can only edit characters you've created."
            );
          }
          // If the user is not the owner, unsubscribe from the subscription
          this.userIdSubscription?.unsubscribe();
        }
      },
      error: () => {
        this.errorHandler.handleError(
          'An error occurred while fetching user information for editing the character.'
        );
        // If an error occurs, unsubscribe from the subscription
        this.userIdSubscription?.unsubscribe();
      },
      complete: () => {
        // Optional: handle completion if needed
      },
    };

    // Subscribe to getUserID() with the observer
    this.userIdSubscription = this.auth.getUserID().subscribe(observer);
  }

  deleteCharacter(character: Character) {
    // Create an observer object
    const observer: Observer<string | null> = {
      next: (userId: string | null) => {
        if (userId === character.userId) {
          if (window.confirm('Are you sure?')) {
            this.characterService
              .deleteCharacter(character)
              .then(() => {
                window.alert('Character deleted!');
                this.getAllCharacters();
                // Optionally, you can refresh the characters list or take other actions after deletion.
              })
              .catch(() => {
                this.errorHandler.handleError(
                  'An error occurred while deleting the character.'
                );
              });
          }
        } else {
          this.errorHandler.handleError(
            'Only the user that created that Character can Delete or Edit it!'
          );
          // If the user is not the owner, unsubscribe from the subscription
          this.userIdSubscription?.unsubscribe();
        }
      },
      error: () => {
        this.errorHandler.handleError(
          'An error occurred while fetching user information for deleting the character.'
        );
      },
      complete: () => {
        // Optional: handle completion if needed
      },
    };

    // Subscribe to getUserID() with the observer
    this.userIdSubscription = this.auth.getUserID().subscribe(observer);
  }

  toggleDetails(character: Character) {
    character.showDetails = !character.showDetails;
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.charactersObj = {
      id: '',
      name: '',
      titles: '',
      gender: '',
      birth: '',
      death: '',
      culture: '',
      weapons: '',
      actor: '',
      userId: '',
      creatorEmail: '',
    };
    this.showAddForm = false;
  }
}
