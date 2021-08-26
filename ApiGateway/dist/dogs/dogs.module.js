"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogsModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const auth_guard_1 = require("../guards/auth.guard");
const logger_middleware_1 = require("../middlewares/logger.middleware");
const dogs_controller_1 = require("./dogs.controller");
const dogs_service_1 = require("./dogs.service");
let DogsModule = class DogsModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes({ path: 'api/dogs', method: common_1.RequestMethod.GET }, { path: 'api/dogs/:id', method: common_1.RequestMethod.GET });
    }
};
DogsModule = __decorate([
    common_1.Module({
        imports: [
            common_1.HttpModule,
            microservices_1.ClientsModule.register([
                {
                    name: 'DOG_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: 'localhost',
                        port: 4002,
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
        controllers: [dogs_controller_1.DogsController],
        providers: [dogs_service_1.DogsService, auth_guard_1.AuthGuard],
    })
], DogsModule);
exports.DogsModule = DogsModule;
//# sourceMappingURL=dogs.module.js.map