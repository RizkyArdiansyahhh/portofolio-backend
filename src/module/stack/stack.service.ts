import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class StackService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createStackDto: CreateStackDto) {
    return await this.prisma.stack.create(createStackDto)
  }

  async findAll() {
    return await this.prisma.stack.all()
  }

  async findOne(id: string) {
    const stack = await this.prisma.stack.where({ id }).first();
    if (!stack) {
      throw new NotFoundException(`Stack with ID "${id}" not found`);
    }
    return stack;
  }

  async update(id: string, updateStackDto: UpdateStackDto) {
    await this.findOne(id);
    return this.prisma.stack.where({ id }).update(updateStackDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.stack.delete({ where: { id } });
  }
}
