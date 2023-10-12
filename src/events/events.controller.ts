import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { ResponseEventDto } from './dto/response-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

@Controller('events')
@ApiTags('events')
@ApiInternalServerErrorResponse({ description: 'Oh, something went wrong' })
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Event has created',
    type: ResponseEventDto,
  })
  create(@Body() createEventDto: CreateEventDto): Promise<ResponseEventDto> {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: [ResponseEventDto],
  })
  findAll(): Promise<ResponseEventDto[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: ResponseEventDto,
  })
  findOne(@Param('id') id: string): Promise<ResponseEventDto> {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: ResponseEventDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<ResponseEventDto> {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: ResponseEventDto,
  })
  remove(@Param('id') id: string): Promise<ResponseEventDto> {
    return this.eventsService.remove(+id);
  }
}
