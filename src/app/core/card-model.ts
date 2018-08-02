export class CardModel {
  id?: string;
  text: string;

  constructor(param?: CardModel) {
    Object.assign(this, param);
  }
}
