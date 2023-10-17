import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ResponseCustomer } from './types/response-customer';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';

@Controller('customer')
@ApiTags('customer')
@ApiInternalServerErrorResponse({ description: 'Oh, something went wrong' })
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

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

  @Get()
  async findAll(): Promise<ResponseCustomer[]> {
    try {
      return await this.customerService.findAll();
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseCustomer> {
    try {
      return await this.customerService.findOne(+id);
    } catch (err) {
      throw err;
    }
  }
}
