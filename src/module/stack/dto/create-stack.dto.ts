import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum StackCategory {
  AI_ML = "AI_ML",
  FRONTEND = "FRONTEND",
  BACKEND = "BACKEND",
  CLOUD_DEVOPS = "CLOUD_DEVOPS",
  DATA_SCIENCE = "DATA_SCIENCE",
  MOBILE = "MOBILE",
}

export class CreateStackDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;


    @IsEnum(StackCategory)
    @IsNotEmpty()
    category: StackCategory;


    @IsString()
    @IsNotEmpty()
    icon: string;
}
