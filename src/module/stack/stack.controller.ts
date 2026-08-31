import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StackService } from './stack.service';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('stack')
export class StackController {
  constructor(private readonly stackService: StackService) {}

  @Post()
  async create(@Body() createStackDto: CreateStackDto) {
    const stack = await this.stackService.create(createStackDto);
    return { message: 'Stack created successfully', data: stack };
  }

  @AllowAnonymous()
  @Get()
  async findAll() {
    const stacks = await this.stackService.findAll();
    return { message: 'Stacks retrieved successfully', data: stacks };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const stack = await this.stackService.findOne(id);
    return { message: 'Stack retrieved successfully', data: stack };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStackDto: UpdateStackDto) {
    const stack = await this.stackService.update(id, updateStackDto);
    return { message: 'Stack updated successfully', data: stack };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.stackService.remove(id);
    return { message: 'Stack deleted successfully' };
  }
}
