import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmployeeService } from '@/employee/employee.service';
import { EmployeeModule } from '@/employee/employee.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/service/prisma.service';
import { UserService } from '@/user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategys/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        signOptions: {
          expiresIn: configService.get<string>('JWT_LIFE_TIME'),
        },
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    EmployeeModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    EmployeeService,
    AuthService,
    JwtStrategy,
    PrismaService,
    UserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
