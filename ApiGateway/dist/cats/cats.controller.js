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
exports.CatsController = void 0;
const common_1 = require("@nestjs/common");
const cats_service_1 = require("./cats.service");
const logging_interceptor_1 = require("../interceptors/logging.interceptor");
const exclude_null_interceptor_1 = require("../interceptors/exclude_null.interceptor");
const auth_guard_1 = require("../guards/auth.guard");
let CatsController = class CatsController {
    constructor(catService) {
        this.catService = catService;
    }
    async findAll() {
        return await this.catService.getAllCats();
    }
    async findOne(id) {
        return this.catService.getQueryCat(id);
    }
    findSingle(prodId) {
        return this.catService.getQueryCat(prodId);
    }
    async addCat(completeBody) {
        return await this.catService.insertCat(completeBody);
    }
    async changeSingle(prodId, completeBody) {
        return await this.catService.updateCat(prodId, completeBody);
    }
    async deleteSingle(prodId) {
        return await this.catService.deleteCat(prodId);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "findAll", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "findOne", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "findSingle", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "addCat", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "changeSingle", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "deleteSingle", null);
CatsController = __decorate([
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor),
    common_1.UseInterceptors(exclude_null_interceptor_1.ExcludeNullInterceptor),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Controller('api/cats'),
    __metadata("design:paramtypes", [cats_service_1.CatsService])
], CatsController);
exports.CatsController = CatsController;
//# sourceMappingURL=cats.controller.js.map