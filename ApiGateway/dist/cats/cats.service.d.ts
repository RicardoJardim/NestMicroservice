import { ClientProxy } from '@nestjs/microservices';
export declare class CatsService {
    private readonly clientProxy;
    constructor(clientProxy: ClientProxy);
    getAllCats(): Promise<any>;
    getQueryCat(id: number): Promise<any>;
    insertCat(body: {}): Promise<any>;
    updateCat(catId: number, body: {}): Promise<any>;
    deleteCat(catId: number): Promise<any>;
}
