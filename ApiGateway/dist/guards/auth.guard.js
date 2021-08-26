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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const operators_1 = require("rxjs/operators");
let AuthGuard = class AuthGuard {
    constructor(clientProxy) {
        this.clientProxy = clientProxy;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.headers['authorization'] ||
            !request.headers['authorization'].includes('Bearer')) {
            return false;
        }
        const token = request.headers['authorization'].split('Bearer');
        if (token[1].length != 0) {
            return VerifyTokenMicroService(token[1].trim(), this.clientProxy);
        }
        return false;
    }
};
AuthGuard = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('AUTH_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], AuthGuard);
exports.AuthGuard = AuthGuard;
async function VerifyTokenMicroService(tokenBearer, clientProxy) {
    try {
        const res = await clientProxy
            .send({ cmd: 'token', role: 'auth' }, { token: tokenBearer })
            .pipe(operators_1.timeout(5000))
            .toPromise();
        console.log(res.data);
        return res.data;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
//# sourceMappingURL=auth.guard.js.map