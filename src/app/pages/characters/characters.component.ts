import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/service/characters-service/characters';
import { CharactersService } from 'src/app/service/characters-service/characters.service';
import { AuthService } from 'src/app/service/authentication/auth.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  charactersList: Character[] = [];
  showAddForm: boolean = false;
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
    creatorEmail: ''
  };

  constructor(
    private characterService: CharactersService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if the current route is the characters page
    if (this.router.url.includes('/characters')) {
      this.getAllCharacters();
    }
  }

  getAllCharacters() {
    this.characterService.getAllCharacters().subscribe(
      (res: any) => {
        this.charactersList = res.map((e: any) => {
          const data = e.payload.doc.data() as Character;
          data.id = e.payload.doc.id;
          return data;
        });
  
        // No need to fetch creator email here
  
      },
      (err) => {
        console.error('Error while fetching the data:', err);
        alert('Error while fetching characters. Please try again later.');
      }
    );
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
                  .catch((error) => {
                    console.error('Error updating character:', error);
                    alert('Error updating character. Please try again later.');
                  });
              } else {
                // Otherwise, add a new character
                this.characterService
                  .addCharacter(this.charactersObj)
                  .then(() => {
                    console.log('Character added successfully');
                    this.resetForm();
                  })
                  .catch((error) => {
                    console.error('Error adding character:', error);
                    alert('Error adding character. Please try again later.');
                  });
              }
            }
          });
        }
      });
    }
  }

  editCharacter(character: Character) {
    this.auth.getUserID().subscribe((userId: string | null) => {
      if (userId === character.userId) {
        // Set charactersObj to the character being edited
        this.charactersObj = { ...character }; // Copy the character object to prevent direct mutation
        this.showAddForm = true;
      } else {
        if (userId === null) {
          // Handle the case where the user is not authenticated
          console.error('User not authenticated');
          window.alert('You must be logged in to edit characters.');
        } else {
          // Handle the case where the user is logged in but does not own the character
          console.error("You can only edit characters you've created");
          window.alert("You can only edit characters you've created.");
        }
      }
    }, error => {
      console.error('Error getting user ID:', error);
      // Handle the error here, such as displaying an error message to the user
      window.alert('An error occurred while fetching user information for editing the character.');
    });
  }
  
  deleteCharacter(character: Character) {
    this.auth.getUserID().subscribe((userId: string | null) => {
      if (userId === character.userId) {
        if (window.confirm('Are you sure?')) {
          this.characterService
            .deleteCharacter(character)
            .then(() => {
              window.alert('Character deleted!');
              this.getAllCharacters();
              // Optionally, you can refresh the characters list or take other actions after deletion.
            })
            .catch((error) => {
              console.error('Error deleting character:', error);
              // Handle the error here, such as displaying an error message to the user
              window.alert('An error occurred while deleting the character.');
            });
        }
      } else {
        window.alert('Only the user that created that Character can Delete or Edit it!');
      }
    }, error => {
      console.error('Error getting user ID:', error);
      // Handle the error here, such as displaying an error message to the user
      window.alert('An error occurred while fetching user information for deleting the character.');
    });
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

