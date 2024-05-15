import { ChatOpenAI } from '@langchain/openai';
import { FactoryProvider } from '@nestjs/common';

export const openAIServiceProvider: FactoryProvider<ChatOpenAI> = {
  provide: ChatOpenAI,
  useFactory: () => {
    return new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  },
};
