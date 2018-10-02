import {CardModel} from 'src/app/core/card-model';
import {Observable, Subject} from 'rxjs';
import {EventEmitter} from '@angular/core';

export interface CardServiceInterface {
    requestStatus: Subject<object>;

    getList(): Observable<CardModel[]>;

    getCard(id: string): Observable<CardModel>;

    deleteCard(id: string): Observable<any>;

    saveCard(card: CardModel): Observable<any>;
}
