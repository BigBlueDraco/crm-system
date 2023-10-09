import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ResponseCustomer } from './types/response-customer';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<ResponseCustomer> {
    return await this.customerService.create(createCustomerDto);
  }

  @Get()
  async findAll(): Promise<ResponseCustomer[]> {
    return await this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseCustomer> {
    return await this.customerService.findOne(+id);
  }
}
