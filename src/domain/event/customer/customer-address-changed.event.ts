import Address from "../../entity/address";
import EventInterface from "../@shared/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccured: Date;
  eventData: any;

  constructor(customerId: string, customerName: string, customerAddress: Address) {
    this.dataTimeOccured = new Date();
    this.eventData = {
      customerId,
      customerName,
      customerAddress
    };
  }
}