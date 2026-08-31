import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Query,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 1. Upload Single File (POST /api/v1/upload?folder=projects)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|avif)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Query('folder') folder?: string, // 👈 Parameter folder dinamis
  ) {
    return this.uploadService.uploadFile(file, folder);
  }

  // 2. Upload Multiple Files (POST /api/v1/upload/multiple?folder=projects)
  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultipleFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|avif)$/ }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @Query('folder') folder?: string, // 👈 Parameter folder dinamis
  ) {
    return this.uploadService.uploadMultipleFiles(files, folder);
  }
}
