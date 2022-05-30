import Order from "./order"
import OrderItem from "./order_item"


describe('Order unit tests', () => {
  
  it('should throw an error when id is empty', () => {
    expect(() => {
      let order = new Order('', '123', [])
    }).toThrowError('Id is required')
  })
  
  it('should throw an error when customer is empty', () => {
    expect(() => {
      let order = new Order('123', '', [])
    }).toThrowError('Customer id is required')
  })
  
  it('should throw an error when items is empty', () => {
    expect(() => {
      let order = new Order('123', '321', [])
    }).toThrowError('At least one item is required')
  })
  
  it('should calculate total', () => {
    // Arrange.
    const item1 = new OrderItem('i1', 'Item 1', 100, 'p1', 2)
    const item2 = new OrderItem('i2', 'Item 2', 130, 'p2', 2)
    const order = new Order('o1', 'c1', [item1, item2])
    const total = order.total()

    expect(total).toBe(460)
  })
  
})