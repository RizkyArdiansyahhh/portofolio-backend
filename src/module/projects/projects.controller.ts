import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    const project = await this.projectsService.create(createProjectDto);
    return {
      message: 'Project created successfully',
      data: project,
    };
  }

  @AllowAnonymous()
  @Get()
  async findAll() {
    const projects = await this.projectsService.findAll();
    return {
      message: 'Projects retrieved successfully',
      data: projects,
    };
  }

  @Get('id/:id')
  async findOneById(@Param('id') id: string) {
    const project = await this.projectsService.findOneById(id);
    return {
      message: 'Project retrieved successfully',
      data: project,
    };
  }

  @AllowAnonymous()
  @Get(':slug')
  async findOneBySlug(@Param('slug') slug: string) {
    const project = await this.projectsService.findOneBySlug(slug);
    return {
      message: 'Project retrieved successfully',
      data: project,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const project = await this.projectsService.update(id, updateProjectDto);
    return {
      message: 'Project updated successfully',
      data: project,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.projectsService.remove(id);
    return {
      message: 'Project deleted successfully',
    };
  }
}
