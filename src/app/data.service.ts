import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

export interface Verse {
  id: string;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  verses: Observable<Verse[]>;
  versesCollection: AngularFirestoreCollection<Verse>;
  constructor(private afs: AngularFirestore) {
    this.versesCollection = this.afs.collection<Verse>('verses');
    this.verses = this.versesCollection.valueChanges();
  }

  getVerses(): Observable<Verse[]> {
    return this.verses;
  }
}
