import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CardService} from '../core/card.service';
import {Observable, of} from 'rxjs';
import {CardModel} from '../core/card-model';
import {take} from 'rxjs/internal/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public cardForm: FormGroup;
  public card: CardModel;
  public submitted = false;

  constructor(private _fb: FormBuilder,
              private _route: ActivatedRoute,
              private _cardService: CardService,
              private _router: Router) {  }

  ngOnInit() {
    this.cardForm = this._fb.group({text: ''});

    const cardId = this._route.snapshot.firstChild.params['id'];
    console.log(this._route.snapshot.firstChild);

    let cardModelObs: Observable<CardModel>;

    if (cardId) {
      console.log('id:', cardId);
      cardModelObs = this._cardService.getCard(cardId).pipe(take(1));
    } else {
      cardModelObs = of(new CardModel());
    }

    cardModelObs.subscribe((card: CardModel) => {
      console.log(card);
      if (card === null) {
        this._router.navigate(['404']).then();
      } else {
        this.card = card;
        this.cardForm.patchValue({
          text: this.card.text
        });
      }
    });
  }

  onSaveClick(e) {
    e.preventDefault();
    this.submitted = true;

    this.cardForm.value.text = this.cardForm.value.text.trim();
    Object.assign(this.card, this.cardForm.value);

    this._cardService.saveCard(this.card).then(
      () => this._router.navigate(['./']),
      (reason) => console.warn(reason));
  }

  onDeleteClick(e: Event) {
    e.preventDefault();
    if (!this.card.id) {
      this._router.navigate(['./']);
    }
    this._cardService.deleteCard(this.card.id).subscribe(
      () => this._router.navigate(['./']),
      (error) => console.warn(error));
  }
}