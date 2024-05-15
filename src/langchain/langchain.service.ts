import { BadRequestException, Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { HandlebarsPromptTemplate } from 'langchain/experimental/prompts/handlebars';

@Injectable()
export class LangchainService {
  constructor(private readonly openAI: ChatOpenAI) {}

  async chat(prompt: string) {
    try {
      return (await this.openAI.invoke(prompt)).content;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getBookRecommendations(book: string) {
    try {
      const prompt = `
      Based on the book "${book}", I recommend the following reads:
      
      Recommendations:
      {{inputRecommendations}}
    `;

      const llmChain = HandlebarsPromptTemplate.fromTemplate(prompt).pipe(
        this.openAI,
      );

      return await llmChain.invoke({ inputRecommendations: '' });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
