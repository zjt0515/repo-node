import { Module } from '@nestjs/common';
import { DfController } from './df.controller';
import { DfService } from './df.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [DfController],
  providers: [DfService],
})
export class DfModule {}
