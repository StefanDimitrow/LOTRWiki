import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/service/characters-service/characters';
import { CharactersService } from 'src/app/service/characters-service/characters.service';
import { AuthService } from 'src/app/service/authentication/auth.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  charactertsList: Character[] = [];
  charactersObj: Character = {
    userId: '',
    id: '',
    name: '',
    titles: '',
    gender: '',
    birth: '',
    death: '',
    culture: '',
    ruke: '',
    height: '',
    eyes: '',
    hair: '',
    weapons: '',
    actor: '',
  };
  
  id: string = '';
  name: string = '';
  titles: string = '';
  gender: string = '';
  birth: string = '';
  death: string = '';
  culture: string = '';
  ruke: string = '';
  height: string = '';
  eyes: string = '';
  hair: string = '';
  weapons: string = '';
  actor: string = '';
  showAddForm: boolean = false;

  constructor(private data: CharactersService,private auth: AuthService) {}

  ngOnInit(): void {
    this.getAllCharacters();
  }

  getAllCharacters() {
    this.data.getAllCharacters().subscribe(
      (res) => {
        this.charactertsList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          

          return data;
        });
      },
      (err) => {
        alert('Error while catching the data');
      }
    );
  }

  addCharacter() {
    // Get the userID from AuthService
    this.auth.getUserID().subscribe((userId: string | null) => { // Adjust the type of userId accordingly
      if (userId) {
        
        
        // Assign the userID to charactersObj
        
        
        // Check if all required fields are filled in
        if (
          this.name &&
          this.titles &&
          this.gender &&
          this.birth &&
          this.death &&
          this.culture &&
          this.ruke &&
          this.height &&
          this.eyes &&
          this.hair &&
          this.weapons &&
          this.actor
        ) {
          this.charactersObj.id=this.id;
          this.charactersObj.userId = userId;
          this.charactersObj.name = this.name;
          this.charactersObj.titles = this.titles;
          this.charactersObj.gender = this.gender;
          this.charactersObj.birth = this.birth;
          this.charactersObj.death = this.death;
          this.charactersObj.culture = this.culture;
          this.charactersObj.ruke = this.ruke;
          this.charactersObj.height = this.height;
          this.charactersObj.eyes = this.eyes;
          this.charactersObj.hair = this.hair;
          this.charactersObj.weapons = this.weapons;
          this.charactersObj.actor = this.actor;
          
          // Add character
          this.data.addCharacters(this.charactersObj);
          this.resetForm();
        } else {
          alert('Fill all inputs!');
        }
      } else {
        // Handle case when user is not authenticated
        console.log('User not authenticated');
        // Optionally, you can redirect the user to the login page
        // this.router.navigate(['/login']);
      }
    });
  }
  
  resetForm() {
    this.id = '';
    this.name = '';
    this.titles = '';
    this.gender = '';
    this.birth = '';
    this.death = '';
    this.culture = '';
    this.ruke = '';
    this.height = '';
    this.eyes = '';
    this.hair = '';
    this.weapons = '';
    this.actor = '';
  }
  updateCharacter() {}
  deleteCharacter(character: Character) {
    if (window.confirm(`Are you sure?`)) this.data.deleteCharacter(character);
  }
  toggleAddForm() {
    this.showAddForm = !this.showAddForm; 
    this.resetForm(); 
  }
}
