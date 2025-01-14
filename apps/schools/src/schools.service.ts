import { Injectable } from '@nestjs/common';

@Injectable()
export class SchoolsService {
  getHello(): string {
    return 'Hello World!';
  }
}
