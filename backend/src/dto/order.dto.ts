export class CreateOrderDto {
    readonly email?: string;
    date: string;
    readonly typeOfService: string;
    readonly place?: string;
    readonly comments?: string;
    status?: string;
}

export class UpdateOrderDto {
    readonly email?: string;
    date: string;
    readonly typeOfService: string;
    readonly place?: string;
    readonly comments?: string;
    status?: string;
}
