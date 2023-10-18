import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ResponseCustomer } from './types/response-customer';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseCustomerDto } from './dto/response-customer.dto';

@Controller('customer')
@ApiTags('customer')
@ApiInternalServerErrorResponse({ description: 'Oh, something went wrong' })
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Customer created',
    type: ResponseCustomerDto,
  })
  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<ResponseCustomer> {
    try {
      return await this.customerService.create(createCustomerDto);
    } catch (err) {
      throw err;
    }
  }

  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'All customers',
    type: [ResponseCustomerDto],
  })
  @Get()
  async findAll(): Promise<ResponseCustomer[]> {
    try {
      return await this.customerService.findAll();
    } catch (err) {
      throw err;
    }
  }

  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Customer',
    type: ResponseCustomerDto,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseCustomer> {
    try {
      return await this.customerService.findOne(+id);
    } catch (err) {
      throw err;
    }
  }
}
