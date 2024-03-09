import { Module, ValidationPipe } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { Auth } from './api/auth/entities/auth.entity';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { Exception } from './common/middlewares/exception';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist'),
      serveRoot: '/', // Optional, set the root path to serve static files
      serveStaticOptions: {
        // index: false, // Disable index.html serving
        // setHeaders: (res) => {
        //   res.setHeader('Content-Type', 'application/javascript');
        // },
      },
    }),
    TypeOrmModule.forRoot(
      // {
      //   type: 'mssql',
      //   host: '192.168.5.121',
      //   port: 1433,
      //   username: 'afraz',
      //   password: 'aff_afraz_DIQR_PWA2023',
      //   database: 'Affiliation',
      //   entities: [User],
      //   synchronize: true,
      //   options: {
      //     encrypt: false,
      //   },
      // },
      {
        type: 'mssql',
        host: '192.168.5.121',
        port: 1433,
        username: 'root',
        password: 'Afraz72242',
        database: 'Affiliation',
        entities: [Auth],
        synchronize: true,
        options: {
          encrypt: false,
        },
      },
    ),
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR, // Global interceptor for Response handling
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER, // Global Exception Filter for handling exceptions
      useClass: Exception,
    },
    {
      provide: APP_PIPE, // Global Validation Pipe for handling Request data validation
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
