import { Injectable } from '@nestjs/common';
import { Ollama } from 'ollama';
import { ConfigService } from '@nestjs/config';
import { CreateTaskDto } from '@app/common';

@Injectable()
export class QuestionProcessorService {
  private readonly ollama = new Ollama({
    host: this.configService.getOrThrow('OLLAMA_HOST'),
  });

  constructor(private readonly configService: ConfigService) {}
  async generateTask(data: CreateTaskDto) {
    try {
      console.log('Processing task:', data);
      const response = await this.ollama.chat({
        model: 'llama3.2',
        messages: [{ role: 'user', content: 'Why is the sky blue?' }],
      });
      console.log(response.message.content);

      return 'Task generated';
    } catch (error) {
      console.error('Error interacting with Ollama API:', error);
      throw new Error('Failed to generate task');
    }
  }
}
