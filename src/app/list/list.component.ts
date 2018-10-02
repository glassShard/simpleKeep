import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {CardModel} from '../core/card-model';
import {Router} from '@angular/router';
import {HttpCardService} from '../core/card-service/http/http-card.service';
import {LoggerService} from '../core/logger.service';
import {FirebaseCardService} from '../core/card-service/firebase/firebase-card.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
    public cards$: Observable<CardModel[]>;
    public isLoading = true;
    private _subscriptions: Subscription[] = [];

    constructor(private _cardService: FirebaseCardService,
                private _router: Router) {
    }

    ngOnInit() {
        this._subscriptions.push(this._cardService.requestStatus
            .subscribe((data: {log: string, loader: boolean}) => this.isLoading = data.loader));
        this.loadCards();
    }

    ngOnDestroy() {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    loadCards() {
        this.cards$ = this._cardService.getList();
    }


    viewClicked(id) {
        this._router.navigate(['card', id]);
    }

    deleteClicked(id) {
        this._cardService.deleteCard(id)
            .subscribe(
                () => {
                    this.loadCards();
                },
                (err) => {
                    console.warn(`Hiba a tölésnél: ${err}`);
                }
            );
    }
}
