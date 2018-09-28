import {Component, OnInit} from '@angular/core';
import {CardService} from '../core/card.service';
import {Observable, of} from 'rxjs';
import {CardModel, MongoCard, MongoList} from '../core/card-model';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {HttpEventType} from '@angular/common/http';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    public cards$: Observable<CardModel[]>;

    constructor(private _cardService: CardService,
                private _router: Router) {
    }

    ngOnInit() {
        this.loadCards();
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
