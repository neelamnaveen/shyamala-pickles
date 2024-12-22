import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderOrder } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/schema/order.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: "Order", schema: OrderSchema }]) ],
  controllers: [OrderController],
  providers: [OrderOrder],
})
export class OrderModule {}
