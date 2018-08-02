import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {CardModel} from './card-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private _afDb: AngularFireDatabase) { }

  getList(): Observable<any[]> {
    return this._afDb.list('cards').valueChanges();
  }
}
