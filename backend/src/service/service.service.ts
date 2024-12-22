import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Service } from '../schema/service.schema';
import { CreateServiceDto, UpdateServiceDto } from '../dto/service.dto';

@Injectable()
export class ServiceService {
    constructor(@InjectModel("Service") private serviceModel: Model<Service>) {}

    async addService(createServiceDto: CreateServiceDto): Promise<Service> {
        const createdService = new this.serviceModel(createServiceDto);
        return createdService.save();
    }

    async deleteService(id: string): Promise<string> {
        await this.serviceModel.deleteOne({_id:id}).exec();

        return "Deletion succeeded"
    }

    async updateServiceById(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
        const updatedService = await this.serviceModel.findByIdAndUpdate(id, updateServiceDto, { new: true }).exec();
        if (!updatedService) {
            throw new NotFoundException('Service not found');
        }
        return updatedService;
    }

    async getAllServices(): Promise<Service[]> {
        return this.serviceModel.find().exec();
    }

    async getServiceById(id: string): Promise<Service> {
        const service = await this.serviceModel.findById(id).exec();
        if (!service) {
            throw new NotFoundException('Service not found');
        }
        return service;
    }
}
