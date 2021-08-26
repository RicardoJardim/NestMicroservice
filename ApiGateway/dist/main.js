"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const timeout_interceptor_1 = require("./interceptors/timeout.interceptor");
const logging_interceptor_1 = require("./interceptors/logging.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new timeout_interceptor_1.TimeoutInterceptor());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
    app.setBaseViewsDir(path_1.join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map