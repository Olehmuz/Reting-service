import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/auth.schema';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { NOT_EXIST_USER, WRONG_PASSWORD } from './auth.const';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

	async createUser(dto: AuthDto): Promise<UserDocument> {
		const user = await this.userModel.findOne({ email: dto.login }).exec();
		if (user) {
			throw new BadRequestException('error');
		}
		const salt = genSaltSync(parseInt(this.configService.get('SALT')));
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: hashSync(dto.password, salt),
		});
		return newUser.save();
	}

	async findByEmail(email: string): Promise<UserDocument> {
		return this.userModel.findOne({ email }).exec();
	}

	async validateUser({ login, password }: AuthDto): Promise<Pick<UserDocument, 'email'>> {
		const user = await this.findByEmail(login);
		if (!user) {
			throw new UnauthorizedException(NOT_EXIST_USER);
		}
		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD);
		}
		return { email: user.email };
	}

	async login(email: string): Promise<{ accessToken: string }> {
		const payload = { email };
		return {
			accessToken: this.jwtService.sign(payload),
		};
	}
}
