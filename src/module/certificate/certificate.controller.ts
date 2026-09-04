import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) { }

  @Post()
  async create(@Body() createCertificateDto: CreateCertificateDto) {
    const certificate = await this.certificateService.create(createCertificateDto);
     return { data: certificate, message: "Certificate created successfully" }
  }

  @Get()
  async findAll() {
    const certificate = await this.certificateService.findAll();
    return { data: certificate, message: "Certificate fetched successfully" }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const certificate = await this.certificateService.findOne(id);
    return { data: certificate, message: "Certificate fetched successfully" }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCertificateDto: UpdateCertificateDto) {
    const certificate = await this.certificateService.update(id, updateCertificateDto);
    return { data: certificate, message: "Certificate updated successfully" }
  }

  @Delete(':id')
    async remove(@Param('id') id: string) {
      const certificate = await this.certificateService.remove(id);
      return { data: certificate, message: "Certificate deleted successfully" }

  }
}
