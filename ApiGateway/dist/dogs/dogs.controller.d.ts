import { DogsService } from './dogs.service';
export declare class DogsController {
    private readonly dogService;
    constructor(dogService: DogsService);
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    findSingle(prodId: number): Promise<any>;
    addOne(completeBody: {}): Promise<any>;
    changeSingle(prodId: number, completeBody: {}): Promise<any>;
    deleteSingle(prodId: number): Promise<any>;
}
