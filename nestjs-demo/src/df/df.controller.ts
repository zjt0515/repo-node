import { Controller, Get, Response } from '@nestjs/common';

import { Public } from '../auth/decorator/public.decorator.js';
import { DfService } from './df.service.js';

@Controller('df')
export class DfController {
  constructor(private dfService: DfService) {}

  @Get('/password')
  @Public()
  getDFPassword(@Response() resp: Response) {
    // resp.he
    return this.dfService.getDfPassword();
  }
}
