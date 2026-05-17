import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DfService {
  constructor(private readonly httpService: HttpService) {}

  async getDfPassword() {
    const DFPasswordURL = 'https://df-api.shallow.ink/df/tools/dailykeyword';
    const res = await this.httpService.axiosRef.get(DFPasswordURL, {
      headers: {
        Authorization: 'Bearer sk-1FQHlsygy0CYRm9EPl3k4ZpMKPyOs16Z',
      },
    });
    return res.data;
  }
}
