import EventDispatcher from "../event/@shared/event-dispatcher";
import CustomerAddressChangedEvent from "../event/customer/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import EnviaConsoleLogHandler from "../event/customer/handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "../event/customer/handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../event/customer/handler/envia-console-log2.handler";
import Address from "./address";

export default class Customer {

  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private _eventDispatcher: EventDispatcher;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate()
    
    this.registerEvents();
    this.sendCustomerCreatedEvent();
  }

  get id() { return this._id; }
  get name(): string { return this._name; }
  get address(): Address { return this._address; }
  get rewardPoints(): number { return this._rewardPoints; }
  get eventDispatcher(): EventDispatcher { return this._eventDispatcher}

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required.")
    }
    if (this._name.length === 0) {
      throw new Error("Name is required.")
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate()
  }

  changeAddress(address: Address) {
    this._address = address;
    this.sendCustomerAddressChangedEvent()
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is required.")
    }
    this._active = true;
  }

  isActive(): boolean { return this._active; }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
  
  registerEvents(): void {
    const eventDispatcher = new EventDispatcher()

    // Creating handlers.
    const eventHandler = new EnviaConsoleLogHandler()
    const eventHandler1 = new EnviaConsoleLog1Handler()
    const eventHandler2 = new EnviaConsoleLog2Handler()

    // Register event handlers.
    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler1)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2)

    this._eventDispatcher = eventDispatcher
  }

  sendCustomerCreatedEvent() {
    const eventCustomerCreated = new CustomerCreatedEvent({
      id: this._id,
    })

    this._eventDispatcher.notify(eventCustomerCreated)
  }
  
  sendCustomerAddressChangedEvent() {
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      this._id,
      this._name,
      this._address
    )

      this._eventDispatcher.notify(customerAddressChangedEvent)
  }
}