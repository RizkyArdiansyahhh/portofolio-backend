import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsOptional()
  liveUrl?: string;

  @IsUrl()
  @IsOptional()
  githubUrl?: string;

  @IsString()
  @IsNotEmpty()
  ownership: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsOptional()
  team?: string;

  @IsArray()
  @IsString({ each: true })
  features: string[];

  @IsArray()
  @IsString({ each: true })
  techStack: string[];

  @IsArray()
  @IsString({ each: true })
  impact: string[];

  @IsArray()
  @IsString({ each: true })
  images: string[];
}
