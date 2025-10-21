// v1-search.controller.ts
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('v1/trips')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);
  public static requestCount = 0;

  constructor(private readonly sgService: SearchService) {}

  @Get('/search')
  async tripsSearch(
    @Query('from') from: string,
    @Query('destination') destination: string,
    @Query('date') date: Date,
  ) {
    SearchController.requestCount++;
    this.logger.debug(
      `V1 search endpoint hit | count=${SearchController.requestCount} | from=${from} | destination=${destination} | date=${date} `,
    );

    const result = await this.sgService.tripSearchV1(destination, from, date);
    return result;
  }
}
