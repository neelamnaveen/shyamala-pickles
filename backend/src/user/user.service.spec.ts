import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

const mockUser = {
    email: 'test@example.com',
    password: 'password',
};

const mockUserModel = {
    new: jest.fn().mockResolvedValue(mockUser),
    constructor: jest.fn().mockResolvedValue(mockUser),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    save: jest.fn().mockResolvedValue(mockUser),
    exec: jest.fn(),
};

describe('UserService', () => {
    let service: UserService;
    let model: Model<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserModel,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        model = module.get<Model<User>>(getModelToken(User.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should register a user', async () => {
        jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
        const newUser = await service.register(mockUser);
        expect(newUser).toEqual(mockUser);
    });

    it('should login a user', async () => {
        mockUserModel.findOne.mockResolvedValue(mockUser);
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
        const result = await service.login('test@example.com', 'password');
        expect(result).toBe(true);
    });

    it('should get a user by email', async () => {
        mockUserModel.findOne.mockResolvedValue(mockUser);
        const user = await service.getUserByEmail('test@example.com');
        expect(user).toEqual(mockUser);
    });

    it('should update a user by email', async () => {
        mockUserModel.findOneAndUpdate.mockResolvedValue(mockUser);
        const updatedUser = await service.updateUserByEmail('test@example.com', mockUser);
        expect(updatedUser).toEqual(mockUser);
    });
});
