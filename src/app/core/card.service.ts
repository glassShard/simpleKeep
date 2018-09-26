import {Injectable} from '@angular/core';
import {CardModel, MongoCard, MongoList} from './card-model';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {switchMap, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CardService {
    constructor(private _http: HttpClient) {
    }


    getList(): Observable<HttpEvent<any>> {
        const httpReq = new HttpRequest('GET', `${environment.mongoUrl}`, environment.httpOptions);
        return this._http.request(httpReq);
    }

    getCard(id: string): Observable<CardModel> {
        return this._http.get<MongoCard>(`${environment.mongoUrl}/${id}`, environment.httpOptions)
            .pipe(switchMap((response: MongoCard) => {
                return of(new CardModel({id: response._id.$oid, text: response.text}));
            }));
    }

    deleteCard(id: string): Observable<null> {
        return this._http.delete<null>(`${environment.mongoUrl}/${id}`, environment.httpOptions);
    }

    saveCard(card: CardModel): Observable<null> {
        if (card.id) {
            return this._http.put<null>(`${environment.mongoUrl}/${card.id}`, {'text': card.text}, environment.httpOptions);
        } else {
            return this._http.post<null>(`${environment.mongoUrl}`, {'text': card.text}, environment.httpOptions);
        }
    }

    /*    getList(): Observable<any[]> {
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
        }*/

    createCard() {
        console.log('this is it');

        return this._http.post(environment.mongoUrl, {'text': 'this is the dafault card'}, environment.httpOptions);
    }
}
