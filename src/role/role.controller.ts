import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseRoleDto } from './dto/response-role.dto';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('role')
@ApiTags('role')
@ApiInternalServerErrorResponse({ description: 'Oh, something went wrong' })
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Role has created',
    type: ResponseRoleDto,
  })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<ResponseRoleDto> {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: [ResponseRoleDto],
  })
  async findAll(): Promise<ResponseRoleDto[]> {
    return await this.roleService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: ResponseRoleDto,
  })
  findOne(@Param('id') id: string): Promise<ResponseRoleDto> {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: ResponseRoleDto,
  })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    type: ResponseRoleDto,
  })
  remove(@Param('id') id: string): Promise<ResponseRoleDto> {
    return this.roleService.remove(+id);
  }
}
