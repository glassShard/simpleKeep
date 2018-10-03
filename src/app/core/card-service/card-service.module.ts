import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpCardService} from './http/http-card.service';
import {FirebaseCardService} from './firebase/firebase-card.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      HttpCardService,
      FirebaseCardService
  ]
})
export class CardServiceModule { }
