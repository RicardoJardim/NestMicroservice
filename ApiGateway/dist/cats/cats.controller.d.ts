import { CatsService } from './cats.service';
export declare class CatsController {
    private readonly catService;
    constructor(catService: CatsService);
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    findSingle(prodId: number): Promise<any>;
    addCat(completeBody: {}): Promise<any>;
    changeSingle(prodId: number, completeBody: {}): Promise<any>;
    deleteSingle(prodId: number): Promise<any>;
}
