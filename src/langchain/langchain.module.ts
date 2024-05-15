import { Global, Module } from '@nestjs/common';
import { LangchainService } from './langchain.service';
import { LangchainController } from './langchain.controller';
import { openAIServiceProvider } from './openai-client.provider';

@Global()
@Module({
  imports: [],
  controllers: [LangchainController],
  providers: [openAIServiceProvider, LangchainService],
})
export class LangchainModule {}
