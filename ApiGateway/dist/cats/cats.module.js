"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const auth_guard_1 = require("../guards/auth.guard");
const logger_middleware_1 = require("../middlewares/logger.middleware");
const cats_controller_1 = require("./cats.controller");
const cats_service_1 = require("./cats.service");
let CatsModule = class CatsModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes({ path: 'api/cats', method: common_1.RequestMethod.GET }, { path: 'api/cats/:id', method: common_1.RequestMethod.GET });
    }
};
CatsModule = __decorate([
    common_1.Module({
        imports: [
            common_1.HttpModule,
            microservices_1.ClientsModule.register([
                {
                    name: 'CAT_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: 'localhost',
                        port: 4001,
                    },
                },
                {
                    name: 'AUTH_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: 'localhost',
                        port: 4000,
                    },
                },
            ]),
        ],
        controllers: [cats_controller_1.CatsController],
        providers: [cats_service_1.CatsService, auth_guard_1.AuthGuard],
    })
], CatsModule);
exports.CatsModule = CatsModule;
//# sourceMappingURL=cats.module.js.map