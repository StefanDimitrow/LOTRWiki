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
    if (this.router.url.includes('/characters')) {
      this.getAllCharacters();
    }
  }

  ngOnDestroy(): void {
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
    if (this.getAllCharactersSubscription) {
      this.getAllCharactersSubscription.unsubscribe();
    }
  }

  getAllCharacters() {
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
        );
      },
      complete: () => {
        if (this.getAllCharactersSubscription) {
          this.getAllCharactersSubscription.unsubscribe();
        }
      },
    };

    this.getAllCharactersSubscription = this.characterService
      .getAllCharacters()
      .subscribe(observer);
  }

  addOrUpdateCharacter() {
    if (this.charactersObj) {
      this.auth.getUserID().subscribe((userId: string | null) => {
        if (userId) {
          this.charactersObj.userId = userId;

          this.auth.getUserEmail().subscribe((email: string | null) => {
            if (email) {
              this.charactersObj.creatorEmail = email;

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
    const observer: Observer<string | null> = {
      next: (userId: string | null) => {
        if (userId === character.userId) {
          this.charactersObj = { ...character };
          this.showAddForm = true;
        } else {
          if (userId === null) {
            this.errorHandler.handleError(
              'You must be logged in to edit characters.'
            );
          } else {
            this.errorHandler.handleError(
              "You can only edit characters you've created."
            );
          }

          this.userIdSubscription?.unsubscribe();
        }
      },
      error: () => {
        this.errorHandler.handleError(
          'An error occurred while fetching user information for editing the character.'
        );

        this.userIdSubscription?.unsubscribe();
      },
      complete: () => {},
    };

    this.userIdSubscription = this.auth.getUserID().subscribe(observer);
  }

  deleteCharacter(character: Character) {
    const observer: Observer<string | null> = {
      next: (userId: string | null) => {
        if (userId === character.userId) {
          if (window.confirm('Are you sure?')) {
            this.characterService
              .deleteCharacter(character)
              .then(() => {
                window.alert('Character deleted!');
                this.getAllCharacters();
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

          this.userIdSubscription?.unsubscribe();
        }
      },
      error: () => {
        this.errorHandler.handleError(
          'An error occurred while fetching user information for deleting the character.'
        );
      },
      complete: () => {},
    };

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
