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

    constructor(private injector: Injector) {
    }

    getCardService() {
        return this.serviceOption === 'firebase' ? this.injector.get(FirebaseCardService) : this.injector.get(HttpCardService);
    }
}
