import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategys/jwt.strategy';
import { EmployeeModule } from 'src/employee/employee.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmployeeService } from 'src/employee/employee.service';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { UserService } from 'src/user/user.service';

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
