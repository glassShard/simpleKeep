import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardModel} from '../core/card-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: CardModel;
  @Output() viewClicked = new EventEmitter();
  @Output() deleteClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onViewClick() {
    this.viewClicked.emit({id: this.card.id});
  }

  onDeleteClick(e) {
    e.preventDefault();
    console.log(this.card.id);
    this.deleteClicked.emit({id: this.card.id});
  }
}
