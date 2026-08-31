import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  async create(@Body() createExperienceDto: CreateExperienceDto) {
    const experience = await this.experienceService.create(createExperienceDto);
    return {message: "Experience created successfully", data: experience}
  }

  @AllowAnonymous()
  @Get()
  async findAll() {
    const experience = await this.experienceService.findAll();
    return {message: "Experiences fetched successfully", data: experience}
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const experience =  await this.experienceService.findOne(id);
    return {message: "Experience fetched successfully", data: experience}
  }

  @Patch(':id')
    async update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto) {
    const experience =  await this.experienceService.update(id, updateExperienceDto);
    return {message: "Experience updated successfully", data: experience}
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.experienceService.remove(id);
    return {message: "Experience deleted successfully"}
  }
}
