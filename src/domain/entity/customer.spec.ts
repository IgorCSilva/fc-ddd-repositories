import Address from "./address";
import Customer from "./customer";

describe('Customer unit tests', () => {

  it('should throw an error when id is empty', () => {
    expect(() => {
      let customer = new Customer('', 'John');
    }).toThrowError('Id is required');
  })
  
  it('should throw an error when name is empty', () => {
    expect(() => {
      let customer = new Customer('123', '');
    }).toThrowError('Name is required');
  })
  
  it('should change name', () => {
    // Arrange.
    const customer = new Customer('123', 'John');
    
    // Act.
    customer.changeName('Jane')

    // Assert.
    expect(customer.name).toBe('Jane');
  })
  
  it('shouldn\'t change name', () => {
    // Arrange.
    const customer = new Customer('123', 'John');

    // Assert.
    expect(() => {
      customer.changeName('')
    }).toThrowError('Name is required');
  })
  
  it('should activate customer', () => {
    // Arrange.
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Stree 1', 123, '12345-123', 'São Paulo');
    customer.Address = address;

    // Act.
    customer.activate()

    // Assert.
    expect(customer.isActive()).toBe(true);
  })
  
  it('should activate customer', () => {
    // Arrange.
    const customer = new Customer('1', 'Customer 1');

    expect(() => {
      customer.activate()
    }).toThrowError('Address is required.');
  })
  
  it('should deactivate customer', () => {
    // Arrange.
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Stree 1', 123, '12345-123', 'São Paulo');
    customer.Address = address;

    // Act.
    customer.activate()

    // Assert.
    expect(customer.isActive()).toBe(true);

    // Act.
    customer.deactivate()

    // Assert.
    expect(customer.isActive()).toBe(false);
  })

  it('should add reward points', () => {
    const customer = new Customer('1', 'Customer 1');
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })
})