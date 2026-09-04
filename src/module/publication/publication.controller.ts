import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  async create(@Body() createPublicationDto: CreatePublicationDto) {
    const publication = await this.publicationService.create(createPublicationDto);
    return {data : publication, message: "Publication created successfully"}
  }

  @Get()
  async findAll() {
    const publication = await this.publicationService.findAll();
    return {data : publication, message: "Publication fetched successfully"}
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const publication = await this.publicationService.findOneById(id);
    return {data : publication, message: "Publication fetched successfully"}
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    const publication = await this.publicationService.update(id, updatePublicationDto);
    return {data : publication, message: "Publication updated successfully"}
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationService.remove(id);
  }
}
