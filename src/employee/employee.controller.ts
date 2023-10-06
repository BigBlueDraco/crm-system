import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { EmployeeFilterDto } from './dto/employee-filter.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseEmployeeDto } from './dto/response-employee.dto';

@Controller('employee')
@ApiTags('employee')
@ApiInternalServerErrorResponse({ description: 'Oh, something went wrong' })
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 202,
    description: 'Authorized',
    type: ResponseEmployeeDto,
  })
  findOne(@Param('id') id: string): Promise<ResponseEmployeeDto> {
    return this.employeeService.findOne(+id);
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
