import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema } from 'src/schema/service.schema';
import * as multer from 'multer';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Service', schema: ServiceSchema }]),
    MulterModule.register({
      storage: multer.memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit to 5MB
    }),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
