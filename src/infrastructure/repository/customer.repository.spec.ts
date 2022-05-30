import { Sequelize } from "sequelize-typescript"
import Address from "../../domain/entity/address"
import Customer from "../../domain/entity/customer"
import CustomerModel from "../db/sequelize/model/customer.model"
import CustomerRepository from "./customer.repository"

describe('Customer repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true}
    })

    await sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const custmerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipcode 1', 'city 1')

    customer.Address = address
    await custmerRepository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: '123'}})

    expect(customerModel.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    })
  })

  it('should update a customer', async () => {
    const custmerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipcode 1', 'city 1')

    customer.Address = address
    await custmerRepository.create(customer)

    customer.changeName('Customer 2')
    await custmerRepository.update(customer)
    const customerModel = await CustomerModel.findOne({ where: { id: '123' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    })
  })

  it('should find a customer', async () => {
    const custmerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipcode 1', 'city 1')

    customer.Address = address
    await custmerRepository.create(customer)

    const customerResult = await custmerRepository.find(customer.id)

    expect(customer).toStrictEqual(customerResult)
  })

  it('should throw an error when customer is not found', async () => {
    const custmerRepository = new CustomerRepository()

    expect(async () => {
      await custmerRepository.find('12aoid')
    }).rejects.toThrow('Customer not found')
  })

  it('should find all customers', async () => {
    const custmerRepository = new CustomerRepository()
    const customer1 = new Customer('123', 'Customer 1')
    const address1 = new Address('Street 1', 1, 'zipcode 1', 'city 1')
    customer1.Address = address1
    customer1.addRewardPoints(10)
    customer1.activate()

    const customer2 = new Customer('456', 'Customer 2')
    const address2 = new Address('Street 2', 2, 'zipcode 2', 'city 2')
    customer2.Address = address2
    customer2.addRewardPoints(20)

    await custmerRepository.create(customer1)
    await custmerRepository.create(customer2)

    const customers = await custmerRepository.findAll()

    expect(customers.length).toBe(2)
    expect(customers).toContainEqual(customer1)
    expect(customers).toContainEqual(customer2)
    
  })


})