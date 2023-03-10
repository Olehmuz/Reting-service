import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ReviewService } from './review.service';
import { Review } from './schemas/review.schema';

describe('ReviewService', () => {
	let service: ReviewService;
	const exec = { exec: jest.fn() };
	const reviewRepositoryFactory = (): { find: () => typeof exec } => ({
		find: () => exec,
	});
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ReviewService,
				{
					useFactory: reviewRepositoryFactory,
					provide: getModelToken(Review.name),
				},
			],
		}).compile();

		service = module.get<ReviewService>(ReviewService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('findByProductId - test', async () => {
		const productId = new Types.ObjectId(1).toHexString();
		reviewRepositoryFactory().find().exec.mockReturnValueOnce([{ productId }]);
		const res = await service.findProductById(productId);
		expect(res[0].productId).toBe(productId);
	});
});
