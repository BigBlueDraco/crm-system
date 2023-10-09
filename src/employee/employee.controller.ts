import { Body, Controller, Get, HttpCode, Param } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseEmployeeDto } from './dto/response-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
@ApiTags('employee')
@ApiInternalServerErrorResponse({ description: 'Oh, something went wrong' })
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Authorized',
    type: ResponseEmployeeDto,
  })
  async findOne(@Param('id') id: string) {
    return await this.employeeService.findOne(+id);
  }

  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
