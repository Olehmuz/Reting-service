import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.const';

const productId = new Types.ObjectId(1);
const notFoundProductId = new Types.ObjectId(2);
const testDTO = {
	name: 'Iphone',
	title: 'Iphone 11',
	description: 'Cool Iphone',
	rating: 5,
	productId,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create (POST)', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(testDTO)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/review/byProduct/:productId (DELETE) - success', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1);
			});
	});

	it('/review/byProduct/:productId (DELETE) - fail', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + notFoundProductId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
			});
	});

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.expect(200);
	});

	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/review/' + notFoundProductId)
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND,
			});
	});

	afterAll(() => {
		disconnect();
	});
});
