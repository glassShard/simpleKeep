import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardModel} from '../core/card-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card: CardModel;
  @Output() deleteClicked = new EventEmitter();

  constructor() { }

  onDeleteClick(e) {
    e.preventDefault();
    console.log(this.card.id);
    this.deleteClicked.emit({id: this.card.id});
  }
}
