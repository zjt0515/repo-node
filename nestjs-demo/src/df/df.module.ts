import { Module } from '@nestjs/common';
import { DfController } from './df.controller.js';
import { DfService } from './df.service.js';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [DfController],
  providers: [DfService],
})
export class DfModule {}
