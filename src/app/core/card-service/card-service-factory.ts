import {HttpCardService} from './http/http-card.service';
import {FirebaseCardService} from './firebase/firebase-card.service';

export class CardServiceFactory {

    createCardService(type: 'firebase'): FirebaseCardService;
    createCardService(type: 'htto'): HttpCardService;

    public createCardService(serviceOptions): FirebaseCardService | HttpCardService {
        if (serviceOptions.type === 'firebase') {
            return new FirebaseCardService();
        } else {
            return new HttpCardService();
        }
    }
}
