import {Component} from '@angular/core';
import {CardServiceInterface} from '../core/card-service/card-service-interface';
import {Subscription} from 'rxjs';
import {CardServiceFactory} from '../core/card-service/card-service-factory';
import {Router} from '@angular/router';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
    public isLoading = false;

    private _cardService: CardServiceInterface;

    constructor(private _cardServiceFactory: CardServiceFactory) {
        this._cardService = this._cardServiceFactory.getCardService();

        this._cardService
            .requestStatus
            .subscribe((data: {log: string, loader: boolean}) => this.isLoading = data.loader);
    }
}
