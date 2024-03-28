import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Character } from './characters'; // Ensure correct import path and filename

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private afs: AngularFirestore) { }

  addCharacters(character: Character) {
    character.id = this.afs.createId();
    return this.afs.collection('/Characters').add(character);
  }

  getAllCharacters() {
    return this.afs.collection('/Characters/').snapshotChanges();
  }

  deleteCharacter(character:Character) {
    return this.afs.doc('/Characters/'+character.id).delete();
  }
  

  updateCharacters(character: Character) {
    this.deleteCharacter(character);
    this.addCharacters(character)
  }
  
}
