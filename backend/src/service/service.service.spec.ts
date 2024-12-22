import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ServiceService } from './service.service';
import { Service } from '../schema/service.schema';
import { Model } from 'mongoose';

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

const mockServiceModel = {
    new: jest.fn().mockResolvedValue(mockService),
    constructor: jest.fn().mockResolvedValue(mockService),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    create: jest.fn().mockResolvedValue(mockService),
    exec: jest.fn(),
};

describe('ServiceService', () => {
    let service: ServiceService;
    let model: Model<Service>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ServiceService,
                {
                    provide: getModelToken(Service.name),
                    useValue: mockServiceModel,
                },
            ],
        }).compile();

        service = module.get<ServiceService>(ServiceService);
        model = module.get<Model<Service>>(getModelToken(Service.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should add a service', async () => {
        const newService = await service.addService(mockService);
        expect(newService).toEqual(mockService);
    });

    it('should update a service by id', async () => {
        mockServiceModel.findByIdAndUpdate.mockResolvedValue(mockService);
        const updatedService = await service.updateServiceById('serviceId', mockService);
        expect(updatedService).toEqual(mockService);
    });

    it('should get all services by email', async () => {
        mockServiceModel.find.mockResolvedValue([mockService]);
        const services = await service.getAllServicesByEmail('test@example.com');
        expect(services).toEqual([mockService]);
    });

    it('should get a service by id', async () => {
        mockServiceModel.findById.mockResolvedValue(mockService);
        const serviceById = await service.getServiceById('serviceId');
        expect(serviceById).toEqual(mockService);
    });
});
