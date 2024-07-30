import { Role } from "@prisma/client";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    password: string;
    role: Role;
}