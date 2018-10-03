import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {CardModel, MongoCard, MongoList} from '../../card-model';
import {environment} from '../../../../environments/environment';
import {switchMap, tap} from 'rxjs/operators';
import {CardServiceInterface} from '../card-service-interface';

@Injectable({
    providedIn: 'root'
})

export class HttpCardService implements CardServiceInterface {
    private baseUrl = environment.mongoUrl;
    private httpOptions = environment.httpOptions;
    public requestStatus = new EventEmitter();

    constructor(private _http: HttpClient) {
    }

    private sendHttp(method, url, options, body?) {
        this.requestStatus.emit({status: `${method} http request started`, progress: true});
        const req = body ? this._http[method](url, body, options) : this._http[method](url, options);
        return req.pipe(
            tap(() => this.requestStatus.emit({status: `${method} http request ended`, progress: false}))
        );
    }

    public getList(): Observable<CardModel[]> {
        return this.sendHttp('get', this.baseUrl, this.httpOptions)
            .pipe(switchMap((response: MongoList) => {
                const list = response._embedded.map((elem: MongoCard): CardModel => {
                    return {
                        'id': elem._id.$oid,
                        'text': elem.text
                    };
                });
                return of(list);
            }));
    }

    public getCard(id: string): Observable<CardModel> {
        return this.sendHttp('get', `${this.baseUrl}/${id}`, this.httpOptions)
            .pipe(switchMap((response: MongoCard) => {
                return of(new CardModel({id: response._id.$oid, text: response.text}));
            }));
    }

    public deleteCard(id: string): Observable<any> {
        return this.sendHttp('delete', `${this.baseUrl}/${id}`, this.httpOptions);
    }

    public saveCard(card: CardModel): Observable<any> {
        if (card.id) {
            return this.sendHttp('put', `${this.baseUrl}/${card.id}`, this.httpOptions, {'text': card.text});
        } else {
            return this.sendHttp('post', this.baseUrl, this.httpOptions, {'text': card.text});
        }
    }
}
