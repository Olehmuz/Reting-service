import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ALREADY_EXIST_USER } from './auth.const';
import { UserDocument } from './schemas/auth.schema';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto): Promise<{ accessToken: string }> {
		const { email } = await this.authService.validateUser(dto);
		return await this.authService.login(email);
	}

	@UsePipes(new ValidationPipe())
	@Post('registy')
	async registry(@Body() dto: AuthDto): Promise<UserDocument> {
		const user = await this.authService.findByEmail(dto.login);
		if (user) {
			throw new BadRequestException(ALREADY_EXIST_USER);
		}
		return await this.authService.createUser(dto);
	}
}
