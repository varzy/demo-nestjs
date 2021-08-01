import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from '../../decorators/roles.decorator';
import { JwtGuard } from '../../guards/jwt.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Roles('Super')
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return await this.rolesService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rolesService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles('Super')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.rolesService.update(+id, updateRoleDto);
  }

  @ApiBearerAuth()
  @Roles('Super')
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.rolesService.remove(+id);
  }
}
