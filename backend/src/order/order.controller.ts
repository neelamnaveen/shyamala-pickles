import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { OrderOrder } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderOrder: OrderOrder) {}

  @Post('')
  async addOrder(@Body() orderData) {
    return this.orderOrder.addOrder(orderData);
  }

  @Put(':orderId')
  async updateOrderById(@Param('orderId') orderId: string, @Body() updateData) {
    return this.orderOrder.updateOrderById(orderId, updateData);
  }

  @Get('')
  async getAllOrdersByEmail() {
    return this.orderOrder.getAllOrdersByEmail();
  }
  
  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.orderOrder.deleteOrder(id);
  }
}
