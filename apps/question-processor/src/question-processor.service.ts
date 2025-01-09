import { Injectable } from '@nestjs/common';
import { Ollama } from 'ollama';
import { ConfigService } from '@nestjs/config';
import { Answer, CreateQuestionDto } from '@app/common';
import { Types } from 'mongoose';

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
    data: Record<
      string,
      { questionHeader: string; correctAnswer: string; studentAnswer: Answer }
    >,
  ) {
    try {
      const questionComparisons = Object.entries(data)
        .map(
          ([questionId, { questionHeader, correctAnswer, studentAnswer }]) =>
            `Question ID: ${questionId}\nQuestion Header: ${questionHeader}\nCorrect Answer: ${correctAnswer}\nUser Answer: ${studentAnswer.answer}`,
        )
        .join('\n\n');
      console.log('questionComparisons:', questionComparisons);

      const prompt = `
          You are a teacher grading student answers. For each question below, identify whether the "User Answer" is correct or contains errors compared to the "Correct Answer," taking into account the "Question Header."

          Respond in the format:
          [
              {
                  "questionId": "string",
                  "errors": ["string"],
                  "feedback": "string"
              },
              ...
          ]

          Evaluate the questions:
          ${questionComparisons}

          You must not include any additional information in the errors array, you must include only the errors and nothing more.
          You must add a feedback message for each question.
      `;
      const response = await this.ollama.chat({
        model: 'llama3.2',
        messages: [{ role: 'user', content: prompt }],
        options: { temperature: 1 },
      });

      const content = response.message.content;
      console.log('content:', content);
      try {
        const feedbackArray = JSON.parse(content);

        const results = feedbackArray.map(
          (item: {
            questionId: Types.ObjectId;
            errors: string[];
            feedback: string;
          }) => {
            const score = this.calculateScore(item.errors);
            return {
              questionId: item.questionId,
              correct: score >= 0.7,
              score,
            };
          },
        );
        console.log('results:', results);
        return results;
      } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError);
        throw new Error('Failed to parse feedback JSON');
      }
    } catch (error) {
      console.error('Error interacting with Ollama API:', error);
      throw new Error('Failed to correct task');
    }
  }
  private calculateScore(errors: string[]): number {
    if (!errors || errors.length === 0) {
      return 1;
    }
    return Math.max(0, 1 - errors.length * 0.2);
  }
}
