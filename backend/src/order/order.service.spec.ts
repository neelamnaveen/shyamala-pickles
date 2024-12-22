import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { OrderOrder } from './order.service';
import { Order } from '../schema/order.schema';
import { Model } from 'mongoose';

const mockOrder = {
    date: '2023-11-16',
    typeOfOrder: 'test',
    place: 'test place',
    principle: '1000',
    interest: '10%',
    platformId: 'platform123',
    lenderUserId: 'lender123',
    borrowerUserId: 'borrower123',
    status: 'active',
};

const mockOrderModel = {
    new: jest.fn().mockResolvedValue(mockOrder),
    constructor: jest.fn().mockResolvedValue(mockOrder),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    create: jest.fn().mockResolvedValue(mockOrder),
    exec: jest.fn(),
};

describe('OrderOrder', () => {
    let order: OrderOrder;
    let model: Model<Order>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderOrder,
                {
                    provide: getModelToken(Order.name),
                    useValue: mockOrderModel,
                },
            ],
        }).compile();

        order = module.get<OrderOrder>(OrderOrder);
        model = module.get<Model<Order>>(getModelToken(Order.name));
    });

    it('should be defined', () => {
        expect(order).toBeDefined();
    });

    it('should add a order', async () => {
        const newOrder = await order.addOrder(mockOrder);
        expect(newOrder).toEqual(mockOrder);
    });

    it('should update a order by id', async () => {
        mockOrderModel.findByIdAndUpdate.mockResolvedValue(mockOrder);
        const updatedOrder = await order.updateOrderById('orderId', mockOrder);
        expect(updatedOrder).toEqual(mockOrder);
    });

    it('should get all orders by email', async () => {
        mockOrderModel.find.mockResolvedValue([mockOrder]);
        const orders = await order.getAllOrdersByEmail('test@example.com');
        expect(orders).toEqual([mockOrder]);
    });

    it('should get a order by id', async () => {
        mockOrderModel.findById.mockResolvedValue(mockOrder);
        const orderById = await order.getOrderById('orderId');
        expect(orderById).toEqual(mockOrder);
    });
});
