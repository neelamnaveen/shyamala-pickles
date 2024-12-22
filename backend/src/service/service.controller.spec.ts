import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { Service } from '../schema/service.schema';
import { Model } from 'mongoose';
import { CreateServiceDto, UpdateServiceDto } from '../dto/service.dto';

const mockService = {
    date: '2023-11-16',
    typeOfService: 'test',
    place: 'test place',
    principle: '1000',
    interest: '10%',
    platformId: 'platform123',
    lenderUserId: 'lender123',
    borrowerUserId: 'borrower123',
    status: 'active',
};

describe('ServiceController', () => {
    let controller: ServiceController;
    let service: ServiceService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ServiceController],
            providers: [
                ServiceService,
                {
                    provide: getModelToken(Service.name),
                    useValue: Model,
                },
            ],
        }).compile();

        controller = module.get<ServiceController>(ServiceController);
        service = module.get<ServiceService>(ServiceService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should add a service', async () => {
        jest.spyOn(service, 'addService').mockImplementation(async () => mockService);
        const result = await controller.addService(mockService as CreateServiceDto);
        expect(result).toEqual(mockService);
    });

    it('should update a service by id', async () => {
        jest.spyOn(service, 'updateServiceById').mockImplementation(async () => mockService);
        const result = await controller.updateServiceById('serviceId', mockService as UpdateServiceDto);
        expect(result).toEqual(mockService);
    });

    it('should get all services by email', async () => {
        jest.spyOn(service, 'getAllServicesByEmail').mockImplementation(async () => [mockService]);
        const result = await controller.getAllServicesByEmail('test@example.com');
        expect(result).toEqual([mockService]);
    });

    it('should get a service by id', async () => {
        jest.spyOn(service, 'getServiceById').mockImplementation(async () => mockService);
        const result = await controller.getServiceById('serviceId');
        expect(result).toEqual(mockService);
    });
});
