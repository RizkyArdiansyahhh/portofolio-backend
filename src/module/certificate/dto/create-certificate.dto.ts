import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateCertificateDto {
    @IsString()
    @IsNotEmpty()
    title: string;
     
    @IsDate()
    @IsNotEmpty()
    issuedAt: Date;

    @IsString()
    @IsNotEmpty()
    issuer: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    imageUrl: string;

}
