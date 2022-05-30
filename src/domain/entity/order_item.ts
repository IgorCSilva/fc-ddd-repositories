export default class OrderItem {

  private _id: string;
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(id: string, name: string, price: number, productId: string, quantity: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this._productId = productId;
  }

  get id() { return this._id; }
  get name() { return this._name; }
  get productId() { return this._productId; }
  get price(): number { return this._price; }
  get quantity(): number { return this._quantity; }
}