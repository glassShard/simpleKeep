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
        }),
        reportProgress: true
    },
    service: 'firebase'
};
