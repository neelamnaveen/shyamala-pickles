import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderOrder } from './order.service';
import { Model } from 'mongoose';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';

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

describe('OrderController', () => {
    let controller: OrderController;
    let order: OrderOrder;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrderController],
            providers: [
                OrderOrder,
                {
                    provide: getModelToken("Order"),
                    useValue: Model,
                },
            ],
        }).compile();

        controller = module.get<OrderController>(OrderController);
        order = module.get<OrderOrder>(OrderOrder);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should add a order', async () => {
        jest.spyOn(order, 'addOrder').mockImplementation(async () => mockOrder);
        const result = await controller.addOrder(mockOrder as CreateOrderDto);
        expect(result).toEqual(mockOrder);
    });

    it('should update a order by id', async () => {
        jest.spyOn(order, 'updateOrderById').mockImplementation(async () => mockOrder);
        const result = await controller.updateOrderById('orderId', mockOrder as UpdateOrderDto);
        expect(result).toEqual(mockOrder);
    });

    it('should get all orders by email', async () => {
        jest.spyOn(order, 'getAllOrdersByEmail').mockImplementation(async () => [mockOrder]);
        const result = await controller.getAllOrdersByEmail('test@example.com');
        expect(result).toEqual([mockOrder]);
    });

    it('should get a order by id', async () => {
        jest.spyOn(order, 'getOrderById').mockImplementation(async () => mockOrder);
        const result = await controller.getOrderById('orderId');
        expect(result).toEqual(mockOrder);
    });
});
