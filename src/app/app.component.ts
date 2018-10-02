import {Component} from '@angular/core';
import {LoggerService} from './core/logger.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'my-simple-keep';

    constructor(private _logger: LoggerService) {
        this._logger.logThis();
    }
}
