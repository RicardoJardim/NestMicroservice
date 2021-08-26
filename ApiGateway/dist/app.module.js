"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const dogs_module_1 = require("./dogs/dogs.module");
const loggerMain_middleware_1 = require("./middlewares/loggerMain.middleware");
const core_1 = require("@nestjs/core");
const timeout_interceptor_1 = require("./interceptors/timeout.interceptor");
const cats_module_1 = require("./cats/cats.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(loggerMain_middleware_1.LoggerMainMiddleware).forRoutes(app_controller_1.AppController);
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [dogs_module_1.DogsModule, cats_module_1.CatsModule, common_1.HttpModule],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: timeout_interceptor_1.TimeoutInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map