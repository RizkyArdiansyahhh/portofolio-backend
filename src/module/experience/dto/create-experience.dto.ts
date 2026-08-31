import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERN = 'INTERN',
}

export enum WorkArrangement {
  ON_SITE = 'ON_SITE',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
}

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsOptional()
  companyLogo: string;

  @IsString()
  @IsOptional()
  companyUrl: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsEnum(EmploymentType)
  @IsNotEmpty()
  employmentType: EmploymentType;

  @IsString()
  @IsOptional()
  location: string;

  @IsEnum(WorkArrangement)
  @IsNotEmpty()
  workArrangement: WorkArrangement;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate: Date;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  description: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  skills: string[];

}
