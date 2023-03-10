import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './schemas/auth.schema';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/configs/jwt.config';

@Module({
	controllers: [AuthController],
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
	],
	providers: [AuthService],
})
export class AuthModule {}
