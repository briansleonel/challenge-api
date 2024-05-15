import { Controller, Get, Query } from '@nestjs/common';
import { LangchainService } from './langchain.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Langchain')
@Controller('')
export class LangchainController {
  constructor(private readonly langchainService: LangchainService) {}

  @Get('chat')
  @ApiOperation({ summary: 'Allows you to display a response in terms of a prompt' })
  async chat(@Query('prompt') prompt: string) {
    console.log(prompt);

    return await this.langchainService.chat(prompt);
  }

  @Get('book-recomendation')
  @ApiOperation({ summary: 'Display book recommendations based on an entered book name' })
  getRecomendationProduct(@Query('book') book: string) {
    console.log(book);

    return this.langchainService.getBookRecommendations(book);
  }
}
