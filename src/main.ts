import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminService } from './admin/admin.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // CORS
  app.enableCors();

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('College Course Enrollment API')
    .setDescription('REST API for managing courses and student enrollments')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Seed default admin if none exists
  const adminService = app.get(AdminService);
  await adminService.seedDefaultAdmin();

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
  console.log('Swagger UI at http://localhost:3000/api');
}
bootstrap();
