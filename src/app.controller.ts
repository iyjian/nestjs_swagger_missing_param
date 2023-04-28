import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';

class StringInQuery {
  @ApiProperty()
  in: string;
}

@ApiExtraModels(StringInQuery)
class HelloRequest {
  @ApiProperty({
    description: 'name',
    oneOf: [{ type: 'string' }, { $ref: getSchemaPath(StringInQuery) }],
  })
  name: string | StringInQuery;
}

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @ApiOperation({
    summary: 'Hello world',
  })
  getHello(@Query() helloRequest: HelloRequest) {
    return helloRequest;
  }
}
