import { ClientProxy } from '@nestjs/microservices';
export declare class DogsService {
    private readonly clientProxy;
    constructor(clientProxy: ClientProxy);
    getAllDogs(): Promise<any>;
    getQueryDog(id: number): Promise<any>;
    insertDog(body: {}): Promise<any>;
    updateDog(catId: number, body: {}): Promise<any>;
    deleteDog(catId: number): Promise<any>;
}
