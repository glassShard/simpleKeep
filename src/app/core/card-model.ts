export class CardModel {
  id?: string;
  text: string;
  date: number;

  constructor(param?: CardModel) {
    Object.assign(this, param);
  }
}
