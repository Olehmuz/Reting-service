import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './schemas/auth.schema';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	controllers: [AuthController],
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), ConfigModule],
	providers: [AuthService],
})
export class AuthModule {}
