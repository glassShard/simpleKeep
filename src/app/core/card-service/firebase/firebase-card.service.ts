import {EventEmitter, Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {from, Observable} from 'rxjs';
import {CardModel} from '../../card-model';
import {CardServiceInterface} from '../card-service-interface';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirebaseCardService implements CardServiceInterface {
    public requestStatus = new EventEmitter();

    constructor(private _afDb: AngularFireDatabase) {
    }

    getList(): Observable<any[]> {
        return this.sendFirebase('list', 'cards', 'valueChanges', 'getList ').pipe(take(1));
    }

    getCard(id: string): Observable<any> {
        return this.sendFirebase('object', `/cards/${id}`, 'valueChanges', 'getCard');
    }

    deleteCard(id: string): Observable<any> {
        return from(this.sendFirebase('object', `/cards/${id}`, 'remove', 'deleteCard'));
    }

    saveCard(card: CardModel) {
        if (card.id) {
            return this.sendFirebase('object', `/cards/${card.id}`, 'update', 'updateCard', card);
        } else {
            return this.sendFirebase('list', 'cards', 'push', 'createCardFirstStep', card)
                .pipe(
                    map((response: any) => {

                        Object.assign(card, {id: response.key});

                        this.sendFirebase('object', `/cards/${card.id}`, 'update', 'createCardSecondStep', (card));
                    }));
        }
    }

    private sendFirebase(target, url, method, string, param?) {
        this.requestStatus.emit({log: `${string} (${method}) firebase request started`, loader: true});

        let req;

        if (method === 'valueChanges') {
            req = param ? this._afDb[target](url)[method](param) : this._afDb[target](url)[method]();
        } else {
            req = param ? from(this._afDb[target](url)[method](param)) : from(this._afDb[target](url)[method]());
        }

        return req.pipe(
            tap(() => this.requestStatus.emit({log: `${string} (${method}) firebase request ended`, loader: false}))
        );
    }
}

