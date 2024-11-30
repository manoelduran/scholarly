import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'apps/tasks/src/dto/create-task.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TaskProcessorService {
  private readonly baseUrl = 'https://api.ollama.ai';

  constructor(private readonly configService: ConfigService) {}
  async generateTask(data: CreateTaskDto) {
    try {
      console.log('Processing task:', data, this.baseUrl);
      // const response = await axios.post(`${this.baseUrl}/generate`, {
      //   prompt,
      // });
      // return response.data.result;
      return 'Task generated';
    } catch (error) {
      console.error('Error interacting with Ollama API:', error);
      throw new Error('Failed to generate task');
    }
  }
}
