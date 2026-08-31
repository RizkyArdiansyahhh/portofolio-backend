import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createExperienceDto: CreateExperienceDto) {
   return this.prisma.experience.create(createExperienceDto)
  }

  async findAll() {
    return this.prisma.experience.all()
  }

  async findOne(id: string) {
    const experience = await this.prisma.experience.where({ id }).first();
    if (!experience) {
      throw new NotFoundException(`Experience with ID "${id}" not found`);
    }
    return experience;
  }


  async update(id: string, updateExperienceDto: UpdateExperienceDto) {
    await this.findOne(id);
    return this.prisma.experience.where({ id }).update(updateExperienceDto);
  }


  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.experience.where({ id }).delete();
  }
}
