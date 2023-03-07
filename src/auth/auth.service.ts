import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/auth.schema';
import { genSaltSync, hashSync } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		private readonly configService: ConfigService,
	) {}

	async createUser(dto: AuthDto): Promise<UserDocument> {
		const salt = genSaltSync(parseInt(this.configService.get('SALT')));
		const newUser = new this.userModel({
			email: dto.email,
			passwordHash: hashSync(dto.password, salt),
		});
		return newUser.save();
	}

	async findByEmail(email: string): Promise<UserDocument> {
		return this.userModel.findOne({ email }).exec();
	}
}
