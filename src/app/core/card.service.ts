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

  getCard(id: string): Observable<any> {
    return this._afDb.object(`/cards/${id}`).valueChanges();
  }

  deleteCard(id: string): Observable<any> {
    return from(this._afDb.object(`/cards/${id}`).remove());
  }

  saveCard(card: CardModel) {
    if (card.id) {
      return this._afDb.object(`/cards/${card.id}`).update(card);
    } else {
      return this._afDb.list('cards').push(card)
        .then(response => {

          Object.assign(card, {id: response.key});

          this._afDb.object(`/cards/${card.id}`).update(card);
        });
    }
  }
}
