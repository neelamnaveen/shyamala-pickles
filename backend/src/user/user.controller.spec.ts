import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

const mockUser = {
    email: 'test@example.com',
    password: 'password',
};

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                {
                    provide: getModelToken(User.name),
                    useValue: Model,
                },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should register a user', async () => {
        jest.spyOn(service, 'register').mockImplementation(async () => mockUser);
        const result = await controller.register(mockUser as CreateUserDto);
        expect(result).toEqual(mockUser);
    });

    it('should login a user', async () => {
        jest.spyOn(service, 'login').mockImplementation(async () => true);
        const result = await controller.login(mockUser as CreateUserDto);
        expect(result).toEqual(true);
    });

    it('should get a user by email', async () => {
        jest.spyOn(service, 'getUserByEmail').mockImplementation(async () => mockUser);
        const result = await controller.getUserByEmail('test@example.com');
        expect(result).toEqual(mockUser);
    });

    it('should update a user by email', async () => {
        jest.spyOn(service, 'updateUserByEmail').mockImplementation(async () => mockUser);
        const result = await controller.updateUserByEmail('test@example.com', mockUser as UpdateUserDto);
        expect(result).toEqual(mockUser);
    });
});
