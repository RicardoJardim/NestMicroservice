"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let CatsService = class CatsService {
    constructor(clientProxy) {
        this.clientProxy = clientProxy;
    }
    async getAllCats() {
        return await this.clientProxy
            .send({ cmd: 'cat', role: 'getAllCats' }, '')
            .pipe(operators_1.timeout(5000), operators_1.catchError((err) => rxjs_1.of(err)))
            .toPromise();
    }
    async getQueryCat(id) {
        return await this.clientProxy
            .send({ cmd: 'cat', role: 'getOneCat' }, id)
            .pipe(operators_1.timeout(5000), operators_1.catchError((err) => rxjs_1.of(err)))
            .toPromise();
    }
    async insertCat(body) {
        return await this.clientProxy
            .send({ cmd: 'cat', role: 'createCat' }, body)
            .pipe(operators_1.timeout(5000), operators_1.catchError((err) => rxjs_1.of(err)))
            .toPromise();
    }
    async updateCat(catId, body) {
        return await this.clientProxy
            .send({ cmd: 'cat', role: 'changeCat' }, { id: catId, body: body })
            .pipe(operators_1.timeout(5000), operators_1.catchError((err) => rxjs_1.of(err)))
            .toPromise();
    }
    async deleteCat(catId) {
        return await this.clientProxy
            .send({ cmd: 'cat', role: 'deleteCat' }, catId)
            .pipe(operators_1.timeout(5000), operators_1.catchError((err) => rxjs_1.of(err)))
            .toPromise();
    }
};
CatsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('CAT_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], CatsService);
exports.CatsService = CatsService;
//# sourceMappingURL=cats.service.js.map