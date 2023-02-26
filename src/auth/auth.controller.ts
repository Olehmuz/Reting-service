import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto): Promise<void> {}

	@Post('registy')
	async registry(@Body() dto: AuthDto): Promise<void> {}
}
