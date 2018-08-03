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
  @Output() viewClicked = new EventEmitter();

  constructor() { }

  onDeleteClick(e) {
    e.preventDefault();
    this.deleteClicked.emit({id: this.card.id});
  }

  onViewClick(id) {
    this.viewClicked.emit({id: this.card.id});
  }
}
