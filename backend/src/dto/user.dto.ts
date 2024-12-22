export class CreateUserDto {
    role: string;
    readonly email: string;
    readonly password: string;
    readonly contactNumber: string;
}

export class UpdateUserDto {
    role: string;
    readonly email: string;
    readonly password: string;
    readonly contactNumber: string;
}
