import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Character } from './characters'; // Ensure correct import path and filename

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private afs: AngularFirestore) { }

  addCharacter(character: Character) {
    character.id = this.afs.createId();
    return this.afs.collection('/Characters').add(character);
  }

  getAllCharacters() {
    return this.afs.collection('/Characters/').snapshotChanges();
  }

  deleteCharacter(character: Character) {
    return this.afs.doc('/Characters/' + character.id).delete();
  }
  

  updateCharacter(character: Character) {
    const { id, ...updatedCharacter } = character; // Destructure id and create updatedCharacter without it
    return this.afs.doc(`/Characters/${id}`).update(updatedCharacter); // Use update directly on the document reference
  }
}