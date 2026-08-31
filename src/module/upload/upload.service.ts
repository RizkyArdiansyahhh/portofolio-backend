import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {
  private supabase: SupabaseClient;
  private bucket: string;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');
    this.bucket = this.configService.get<string>('SUPABASE_BUCKET') || 'portfolio';

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials (SUPABASE_URL, SUPABASE_KEY) are missing in .env');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }
async uploadFile(file: Express.Multer.File, folder: string = 'general') {
  if (!file) {
    throw new BadRequestException('File is required');
  }

  const fileExt = file.originalname.split('.').pop();
  const cleanFileName = file.originalname
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-');
    
  // 👉 Sekarang nama folder dinamis (misal: 'projects', 'avatars', 'certificates')
  const fileName = `${folder}/${Date.now()}-${cleanFileName}.${fileExt}`;

  const { data, error } = await this.supabase.storage
    .from(this.bucket)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new BadRequestException(`Failed to upload to Supabase: ${error.message}`);
  }

  const { data: publicUrlData } = this.supabase.storage
    .from(this.bucket)
    .getPublicUrl(data.path);

  return {
    url: publicUrlData.publicUrl,
    path: data.path,
  };
}

async uploadMultipleFiles(files: Express.Multer.File[], folder: string = 'general') {
  if (!files || files.length === 0) {
    throw new BadRequestException('Files are required');
  }

  const uploadPromises = files.map((file) => this.uploadFile(file, folder));
  return Promise.all(uploadPromises);
}

}

