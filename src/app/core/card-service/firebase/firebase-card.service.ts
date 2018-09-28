import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {from, Observable} from 'rxjs';
import {CardModel} from '../../card-model';
import {CardServiceInterface} from '../card-service-interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCardService implements CardServiceInterface {

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
            return from(this._afDb.object(`/cards/${card.id}`).update(card));
        } else {
            return from(this._afDb.list('cards').push(card)
                .then(response => {

                    Object.assign(card, {id: response.key});

                    this._afDb.object(`/cards/${card.id}`).update(card);
                }));
        }
    }
}

