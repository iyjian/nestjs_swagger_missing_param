import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiProperty,
  getSchemaPath,
  refs,
} from '@nestjs/swagger';

class Pet {
  @ApiProperty()
  petName: string;
}

class Cat {
  @ApiProperty()
  catName: string;
}

@ApiExtraModels(Pet, Cat)
class HelloRequest {
  @ApiProperty({
    description: 'name',
    oneOf: [{ $ref: getSchemaPath(Pet) }, { $ref: getSchemaPath(Cat) }],
    type: () => Object
  })
  name: Pet | Cat;
}

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @ApiOperation({
    summary: 'Hello',
  })
  getHello(@Query() helloRequest: HelloRequest) {
    return helloRequest;
  }
}
