import Address from "../../../entity/address";
import EventDispatcher from "../../@shared/event-dispatcher"
import CustomerAddressChangedEvent from "../customer-address-changed.event";
import CustomerCreatedEvent from "../customer-created.event";
import EnviaConsoleLog1Handler from "../handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../handler/envia-console-log2.handler";
import EnviaConsoleLogHandler from "./envia-console-log.handler";


describe('Event handles tests', () => {

  it('should notify all customer created event handlers', () => {
    // Criando dispatcher para armazenar os handlers
    const eventDispatcher = new EventDispatcher();

    // Criando os handlers.
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

    // Registrando os handlers.
    eventDispatcher.register('CustomerCreatedEvent', eventHandler1)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2)

    // Verificando se os handlers foram registrados corretamente.
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(2)
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toContainEqual(eventHandler1)
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toContainEqual(eventHandler2)

    // Criando o evento.
    const customerCreatedEvent = new CustomerCreatedEvent({
      name: 'Customer 1'
    })

    // Quando o notify for executado os handlers registrados devem ser executados.
    eventDispatcher.notify(customerCreatedEvent)

    expect(spyEventHandler1).toHaveBeenCalled()
    expect(spyEventHandler2).toHaveBeenCalled()
  })

  it('should notify change address event handler', () => {
    // Criando dispatcher para armazenar os handlers
    const eventDispatcher = new EventDispatcher();

    // Criando os handlers.
    const eventHandler = new EnviaConsoleLogHandler();

    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    // Registrando os handlers.
    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler)

    // Verificando se os handlers foram registrados corretamente.
    expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length).toBe(1)
    expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']).toContainEqual(eventHandler)

    // Criando o evento.
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      '1',
      'Customer 1',
      new Address('street 1', 1, 'zipcode 1', 'city1')
    )

    // Quando o notify for executado os handlers registrados devem ser executados.
    eventDispatcher.notify(customerAddressChangedEvent)

    expect(spyEventHandler).toHaveBeenCalled()
  })
})