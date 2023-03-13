import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const userDTO: AuthDto = {
	login: 'olehmuz871@gmail.com',
	password: 'str',
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;
	let token: string;
	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer()).post('/auth/login').send(userDTO);
		token = body.accessToken;
	});

	it('/auth/login (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(userDTO)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.accessToken).toBeDefined();
			});
	});

	it('/auth/login (POST) - wrong password', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...userDTO, password: 'str1' })
			.expect(401);
	});

	it('/auth/login (POST) - wrong login', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...userDTO, login: 'wrongmail@gmail.com' })
			.expect(401);
	});

	afterAll(() => {
		disconnect();
	});
});
