import { Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { PrismaService } from '../../infra/database/prisma.service';

@Injectable()
export class CertificateService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCertificateDto: CreateCertificateDto) {
    const certificate = await this.prisma.certificate.create({
      data: createCertificateDto,
    });
    return certificate;
  }

  async findAll() {
    const certificate = await this.prisma.certificate.all();
    return certificate;
  }

  async findOne(id: string) {
    const certificate = await this.prisma.certificate.where({ id }).first();
    return certificate;
  }

  async update(id: string, updateCertificateDto: UpdateCertificateDto) {
    const certificate = await this.prisma.certificate.where({ id }).update(updateCertificateDto);
    return certificate;
  }

  async remove(id: string) {
    const certificate = await this.prisma.certificate.where({ id }).delete();
    return certificate;
  }
}
