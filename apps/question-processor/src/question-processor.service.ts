import { Injectable } from '@nestjs/common';
import { Ollama } from 'ollama';
import { ConfigService } from '@nestjs/config';
import { CreateQuestionDto } from '@app/common';

@Injectable()
export class QuestionProcessorService {
  private readonly ollama = new Ollama({
    host: this.configService.getOrThrow('OLLAMA_HOST'),
  });

  constructor(private readonly configService: ConfigService) {}
  async generate(data: CreateQuestionDto) {
    try {
      const prompt = `
      Generate 7 questions with this type: ${data.type} and this difficulty level: ${data.difficulty} about this topic: ${data.header}:

      Format the response as an array of objects with the following structure:
      [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string"
        },
        ...
      ]
    `;
      const response = await this.ollama.chat({
        model: 'llama3.2',
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.message.content;

      // Extract the array of questions from the response
      const arrayMatch = content.match(/\[(\s*{[^]*}\s*)\]/);

      if (!arrayMatch) {
        throw new Error('Array not found in content');
      }

      const arrayString = arrayMatch[0];
      const questions = JSON.parse(arrayString);
      console.log('Generated questions:', questions);
      return questions;
    } catch (error) {
      console.error('Error interacting with Ollama API:', error);
      throw new Error('Failed to generate task');
    }
  }
}
