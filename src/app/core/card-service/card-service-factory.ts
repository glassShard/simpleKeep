import {HttpCardService} from './http/http-card.service';
import {FirebaseCardService} from './firebase/firebase-card.service';
import {EventEmitter, Injectable, Injector} from '@angular/core';
import {environment} from '../../../environments/environment';
import {CardModel} from '../card-model';

@Injectable({
    providedIn: 'root'
})

export class CardServiceFactory {
    private serviceOption = environment.service;
    private _cardService: HttpCardService | FirebaseCardService;
    public requestStatus: EventEmitter<{}>;

    constructor(private injector: Injector) {
        this._cardService = this.serviceOption === 'firebase' ? this.injector.get(FirebaseCardService) : this.injector.get(HttpCardService);
        this.requestStatus = this._cardService.requestStatus;
    }

    getList() {
        return this._cardService.getList();
    }

    getCard(id: string) {
        return this._cardService.getCard(id);
    }

    deleteCard(id: string) {
        return this._cardService.deleteCard(id);
    }

    saveCard(card: CardModel) {
        return this._cardService.saveCard(card);
    }
}
