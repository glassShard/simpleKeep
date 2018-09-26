export class CardModel {
    id?: string;
    text: string;

    constructor(param?: CardModel) {
        Object.assign(this, param);
    }
}

export class MongoList {
    id?: string;
    _embedded: any[];
    _id: string;
    _returned: number;
}

export class MongoCard {
    _id?: {
        $oid?: string
    };
    text: string;
    _etag?: {
        $oid?: string
    };

    constructor(param?: MongoCard) {
        Object.assign(this, param);
    }
}
