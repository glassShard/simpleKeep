import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public newFlag = true;

  constructor(private _router: Router) { }

  ngOnInit() {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        this.newFlag = event.url === '/';
        console.log(this.newFlag);
      }
    });
  }
}
