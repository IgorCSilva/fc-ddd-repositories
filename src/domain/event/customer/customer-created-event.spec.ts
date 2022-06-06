import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";

const mockHandle1 = jest.fn();
const mockHandle2 = jest.fn();
const mockHandle = jest.fn();

jest.mock( './handler/envia-console-log1.handler', () => {
	return jest.fn().mockImplementation(() => {
		return {
			handle: mockHandle1
		};
	});
});
jest.mock( './handler/envia-console-log2.handler', () => {
	return jest.fn().mockImplementation(() => {
		return {
			handle: mockHandle2
		};
	});
});
jest.mock( './handler/envia-console-log.handler', () => {
	return jest.fn().mockImplementation(() => {
		return {
			handle: mockHandle
		};
	});
});

describe('Customer created event tests', () => {
  
  it('should call handlers when customer is created', () => {

    const envia1handle = new EnviaConsoleLog1Handler()
    const envia2handle = new EnviaConsoleLog2Handler()
    
    // Criando customer.
    new Customer('123', 'Customer 1')
    
    expect(envia1handle.handle).toHaveBeenCalledTimes(1)
    expect(envia2handle.handle).toHaveBeenCalledTimes(1)
  })
  
  it('should call handler when customer address is changed', () => {

    const enviahandle = new EnviaConsoleLogHandler()
    
    // Criando customer.
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('street 1', 1, 'zipcode 1', 'city1')
    customer.changeAddress(address)

    expect(enviahandle.handle).toHaveBeenCalledTimes(1)
  })
})