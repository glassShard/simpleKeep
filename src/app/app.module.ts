import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {CollapseModule} from 'ngx-bootstrap';
import {EditComponent} from './edit/edit.component';
import {ListComponent} from './list/list.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CardComponent} from './card/card.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoaderComponent} from './loader/loader.component';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        EditComponent,
        ListComponent,
        PageNotFoundComponent,
        CardComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        CollapseModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
