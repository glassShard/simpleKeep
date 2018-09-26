// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {HttpHeaders} from '@angular/common/http';

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyBVY6eAu0eAx7i8XIyu8HejVawsmgwT4AU',
        authDomain: 'mykeep-dfd61.firebaseapp.com',
        databaseURL: 'https://mykeep-dfd61.firebaseio.com',
        projectId: 'mykeep-dfd61',
        storageBucket: 'mykeep-dfd61.appspot.com',
        messagingSenderId: '650224240519'
    },
    root: 'http://localhost:4200',
    mongoUrl: 'http://0.0.0.0:8080/keep/notes',
    httpOptions: {
        headers: new HttpHeaders({
            'Authorization': 'Basic ' + btoa('admin:changeit')
        })
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
