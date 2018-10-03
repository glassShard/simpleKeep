import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {FirebaseCardService} from './card-service/firebase/firebase-card.service';
import {CardServiceFactory} from './card-service/card-service-factory';

@Injectable({
    providedIn: 'root'
})
export class LoggerService implements OnDestroy {
    public log;
    private _subscriptions: Subscription[] = [];

    constructor(private _cardService: CardServiceFactory) {
        console.log('Logger service instantiated.');
        this._subscriptions.push(this._cardService.requestStatus
            .subscribe((data: { log: string, loader: boolean }) => {
                console.log(data.log);
                this.log = data.log;
            }));
    }

    ngOnDestroy() {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    logThis() {
    }
}
