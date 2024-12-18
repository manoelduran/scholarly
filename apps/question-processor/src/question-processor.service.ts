import { Injectable } from '@nestjs/common';
import { Ollama } from 'ollama';
import { ConfigService } from '@nestjs/config';
import { Answer, CreateQuestionDto } from '@app/common';

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

      return questions;
    } catch (error) {
      console.error('Error interacting with Ollama API:', error);
      throw new Error('Failed to generate task');
    }
  }
  async correct(
    data: Record<string, { correctAnswer: string; answer: Answer }>,
  ) {
    try {
      const questionComparisons = Object.entries(data)
        .map(
          ([questionId, { correctAnswer, answer }]) =>
            `Question ID: ${questionId}\nCorrect Answer: ${correctAnswer}\nUser Answer: ${answer.answer}`,
        )
        .join('\n\n');
      const prompt = `
      Compare each question's correct answer with the user's answer.

      Questions to compare:

      ${questionComparisons}
      Format the response as an array of objects with the following structure:
      [
        {
          "questionId": "string",
          "correct": "boolean",
          "score": "number";
        },
        ...
      ]
      `;
      const response = await this.ollama.chat({
        model: 'llama3.2',
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.message.content;

      console.log('content:', content);
      return content;
    } catch (error) {
      console.error('Error interacting with Ollama API:', error);
      throw new Error('Failed to correct task');
    }
  }
}
