import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ParkingModule } from './parking/parking.module';
import { InfractionsModule } from './infractions/infractions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AccessModule } from './access/access.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    AuthModule,
    UsersModule,
    VehiclesModule,
    ParkingModule,
    InfractionsModule,
    NotificationsModule,
    AccessModule,
  ],
})
export class AppModule {}
