export class CreateServiceDto {
    readonly typeOfService: string;
    readonly image;
    readonly description: string;
}

export class UpdateServiceDto {
    readonly typeOfService: string;
    readonly image;
    readonly description: string;
}
