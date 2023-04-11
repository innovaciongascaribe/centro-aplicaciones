import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import configuration from "./configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: "postgres",
        host: configService.get("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get("database.username"),
        password: configService.get("database.password"),
        database: configService.get("database.database"),
        autoLoadModels: true,
        synchronize: false,
        logging: false,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
