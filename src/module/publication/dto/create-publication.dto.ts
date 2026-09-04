import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreatePublicationDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDate()
    @IsNotEmpty()
    published: Date;

    @IsString()
    @IsNotEmpty()
    venue: string;

    @IsString()
    @IsNotEmpty()
    url: string;

}
