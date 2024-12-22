import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../schema/order.schema';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';

@Injectable()
export class OrderOrder {
    constructor(@InjectModel("Order") private orderModel: Model<Order>) {}

    async addOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        createOrderDto.status = "Pending";
        const createdOrder = new this.orderModel(createOrderDto);
        return createdOrder.save();
    }

    async updateOrderById(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
        const updatedOrder = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
        if (!updatedOrder) {
            throw new NotFoundException('Order not found');
        }
        return updatedOrder;
    }

    async getAllOrdersByEmail(): Promise<Order[]> {
        return this.orderModel.find({}).exec();
    }

    async getOrderById(id: string): Promise<Order> {
        const order = await this.orderModel.findById(id).exec();
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        return order;
    }

    async deleteOrder(id: string): Promise<string> {
        await this.orderModel.deleteOne({_id:id}).exec();

        return "Deletion succeeded"
    }
}
