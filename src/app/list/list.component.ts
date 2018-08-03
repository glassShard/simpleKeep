import { Component, OnInit } from '@angular/core';
import {CardService} from '../core/card.service';
import {Observable} from 'rxjs';
import {CardModel} from '../core/card-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public cards$: Observable<CardModel[]>;

  constructor(private _cardService: CardService,
              private _router: Router) { }

  ngOnInit() {
    this.cards$ = this._cardService.getList();
  }

  viewClicked(id) {
    this._router.navigate(['card', id]);
  }

  deleteClicked(id) {
    this._cardService.deleteCard(id)
      .subscribe(
        () => {},
        (err) => {
          console.warn(`Hiba a tölésnél: ${err}`);
        }
      );
  }
}
