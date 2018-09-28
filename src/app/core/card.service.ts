import {Injectable} from '@angular/core';
import {CardModel, MongoCard, MongoList} from './card-model';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {filter, map, switchMap, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CardService {
    constructor(private _http: HttpClient) {
    }


    consoleLog(event: HttpEvent<object>, method) {
        if (event.type === HttpEventType.Sent) {
            console.log(`${method} http sent`);
        }
        if (event.type === HttpEventType.Response) {
            console.log(`${method} http response received`);
        }
    }

    getList(): Observable<CardModel[]> {
        const httpReq = new HttpRequest('GET', `${environment.mongoUrl}`, environment.httpOptions);
        return this.createRequest(httpReq, 'getList')
            .pipe(
                map((body: MongoList) => {
                    return body._embedded.map((elem: MongoCard): CardModel => {
                        return {
                            'id': elem._id.$oid,
                            'text': elem.text
                        };
                    });
                })
            );
    }

    getCard(id: string): Observable<CardModel> {
        const httpReq = new HttpRequest('GET', `${environment.mongoUrl}/${id}`, environment.httpOptions);
        return this.createRequest(httpReq, 'getCard')
            .pipe(
                map((body: MongoCard) => {
                    return new CardModel({id: body._id.$oid, text: body.text});
                })
            );
    }

    deleteCard(id: string): Observable<HttpEvent<object>> {
        const httpReq = new HttpRequest('DELETE', `${environment.mongoUrl}/${id}`, environment.httpOptions);
        return this.createRequest(httpReq, 'delete');
    }

    saveCard(card: CardModel): Observable<HttpEvent<object>> {
        let httpReq;
        if (card.id) {
            httpReq = new HttpRequest('PUT', `${environment.mongoUrl}/${card.id}`, {'text': card.text}, environment.httpOptions);
        } else {
            httpReq = new HttpRequest('POST', `${environment.mongoUrl}`, {'text': card.text}, environment.httpOptions);
        }
        return this.createRequest(httpReq, 'save');
    }

    createRequest(request, method): Observable<HttpEvent<object>> {
        return this._http.request(request)
            .pipe(
                tap((event) => this.consoleLog(event, method)),
                filter((ev: HttpEvent<object>) => ev.type === HttpEventType.Response),
                map((res: HttpResponse<any>) => res.body)
            );
    }
}
