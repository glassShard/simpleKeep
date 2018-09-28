import {CardModel} from 'src/app/core/card-model';
import {Observable} from 'rxjs';

export interface CardServiceInterface {
    getList(): Observable<CardModel[]>;

    getCard(id: string): Observable<CardModel>;

    deleteCard(id: string): Observable<any>;

    saveCard(card: CardModel): Observable<any>;
}
