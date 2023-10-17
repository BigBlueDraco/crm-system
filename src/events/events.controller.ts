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
    try {
      return this.eventsService.create(createEventDto);
    } catch (err) {
      return err;
    }
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: [ResponseEventDto],
  })
  findAll(): Promise<ResponseEventDto[]> {
    try {
      return this.eventsService.findAll();
    } catch (err) {
      return err;
    }
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: ResponseEventDto,
  })
  findOne(@Param('id') id: string): Promise<ResponseEventDto> {
    try {
      return this.eventsService.findOne(+id);
    } catch (err) {
      return err;
    }
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
    try {
      return this.eventsService.update(+id, updateEventDto);
    } catch (err) {
      return err;
    }
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: ResponseEventDto,
  })
  remove(@Param('id') id: string): Promise<ResponseEventDto> {
    try {
      return this.eventsService.remove(+id);
    } catch (err) {
      return err;
    }
  }
}
