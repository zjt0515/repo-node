import { HttpStatus } from "@nestjs/common";

export interface ServiceResp {
  statusCode: HttpStatus,
  message: string
}