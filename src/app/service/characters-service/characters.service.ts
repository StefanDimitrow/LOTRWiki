import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Character } from './characters';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private afs: AngularFirestore) {}

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
    const { id, ...updatedCharacter } = character;
    return this.afs.doc(`/Characters/${id}`).update(updatedCharacter);
  }
}
