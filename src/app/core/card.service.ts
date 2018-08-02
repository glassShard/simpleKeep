import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {CardModel} from './card-model';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private _afDb: AngularFireDatabase) { }

  getList(): Observable<any[]> {
    return this._afDb.list('cards').valueChanges();
  }

  deleteCard(id: string) {
    return from(this._afDb.object(`/cards/${id}`).remove());
  }
}

