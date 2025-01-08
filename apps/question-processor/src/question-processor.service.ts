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
    data: Record<string, { correctAnswer: string; studentAnswer: Answer }>,
  ) {
    try {
      const questionComparisons = Object.entries(data)
        .map(
          ([questionId, { correctAnswer, studentAnswer }]) =>
            `Question ID: ${questionId}\nCorrect Answer: ${correctAnswer}\nUser Answer: ${studentAnswer.answer}`,
        )
        .join('\n\n');
      const prompt = `
      Compare each question's from ${questionComparisons}, look at the "Correct Answer" and "User Answer" and give a score between 0 and 1 considering 0 the minimal score that an student can get and 1 the maximum score. If the answer score is greather than 0.7 the answer is correct, mark as true and show the score, if not mark as false and show the score.


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
      // Extract the array of questions from the response
      const arrayMatch = content.match(/\[(\s*{[^]*}\s*)\]/);

      if (!arrayMatch) {
        throw new Error('Array not found in content');
      }
      console.log('arrayMatch:', arrayMatch);
      const arrayString = arrayMatch[0];
      console.log('arrayString:', arrayString);
      const answers = JSON.parse(arrayString);
      console.log('answers:', answers);
      return answers;
    } catch (error) {
      console.error('Error interacting with Ollama API:', error);
      throw new Error('Failed to correct task');
    }
  }
}
