import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../../infra/database/prisma.service';
import slugify from 'slugify';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. CREATE
  async create(createProjectDto: CreateProjectDto) {
    const baseSlug = slugify(createProjectDto.title, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug;
    let counter = 1;

    while (await this.prisma.project.where({ slug }).first()) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return this.prisma.project.create({
      ...createProjectDto,
      slug,
    });
  }

  // 2. FIND ALL
  async findAll() {
    return this.prisma.project.all();
  }

  // 3. FIND BY ID
  async findOneById(id: string) {
    const project = await this.prisma.project.where({ id }).first();

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    return project;
  }

  // 4. FIND BY SLUG
  async findOneBySlug(slug: string) {
    const project = await this.prisma.project.where({ slug }).first();

    if (!project) {
      throw new NotFoundException(`Project with slug "${slug}" not found`);
    }

    return project;
  }

  // 5. UPDATE
  async update(id: string, updateProjectDto: UpdateProjectDto) {
    await this.findOneById(id);

    let slugData = {};

    if (updateProjectDto.title) {
      const baseSlug = slugify(updateProjectDto.title, {
        lower: true,
        strict: true,
        trim: true,
      });

      let slug = baseSlug;
      let counter = 1;

      const existing = await this.prisma.project.where({ slug }).first();

      if (existing && existing.id !== id) {
        while (await this.prisma.project.where({ slug }).first()) {
          slug = `${baseSlug}-${counter}`;
          counter++;
        }
      }

      slugData = { slug };
    }

    return this.prisma.project.where({ id }).update({
      ...updateProjectDto,
      ...slugData,
    });
  }

  // 6. REMOVE
  async remove(id: string) {
    await this.findOneById(id);
    return this.prisma.project.where({ id }).delete();
  }
}
