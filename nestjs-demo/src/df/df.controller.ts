import { Controller, Get, Response } from '@nestjs/common';
import { DfService } from './df.service';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('df')
export class DfController {
  constructor(private dfService: DfService) {}

  @Get('/password')
  @Public()
  getDFPassword(@Response() resp:Response) {
    resp.he
    return this.dfService.getDfPassword();
  }
}
