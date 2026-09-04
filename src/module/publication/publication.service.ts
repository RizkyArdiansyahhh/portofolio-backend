import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from '../../infra/database/prisma.service';
import slugify from 'slugify';

@Injectable()
export class PublicationService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPublicationDto: CreatePublicationDto) {
    const baseSlug = slugify(createPublicationDto.title, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug;
    let counter = 1;

    while (await this.prisma.publication.where({ slug }).first()) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    return this.prisma.publication.create({
      data: {
        ...createPublicationDto,
        slug,
      },
    });
  }

  async findAll() {
    return this.prisma.publication.all();
  }

  async findOneBySlug(slug: string) {
    return this.prisma.publication.where({ slug }).first();
  }

  async findOneById(id: string) {
    return this.prisma.publication.where({ id }).first();
  }

  async update(id: string, updatePublicationDto: UpdatePublicationDto) {
    return this.prisma.publication.where({ id }).update(updatePublicationDto);
  }

  async remove(id: string) {
    return this.prisma.publication.where({ id }).delete();
  }
}
