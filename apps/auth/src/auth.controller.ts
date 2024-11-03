import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateTaskDto } from 'apps/tasks/src/dto/create-task.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('create_task')
  @UsePipes(new ValidationPipe())
  create(@Payload() data: CreateTaskDto, @Ctx() context: RmqContext) {
    console.log('data', data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return 'hello';
  }
}
