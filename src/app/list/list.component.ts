import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CardModel} from '../core/card-model';
import {Router} from '@angular/router';
import {HttpCardService} from '../core/card-service/http/http-card.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    public cards$: Observable<CardModel[]>;

    constructor(private _cardService: HttpCardService,
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
