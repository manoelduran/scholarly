import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskProcessorService {
  getHello(): string {
    return 'Hello World!';
  }
}
