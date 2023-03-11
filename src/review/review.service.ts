import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(Review.name)
		private readonly reviewModel: Model<ReviewDocument>,
	) {}
	async create(dto: CreateReviewDto): Promise<ReviewDocument> {
		return this.reviewModel.create(dto);
	}

	async delete(productId: string): Promise<ReviewDocument | null> {
		return this.reviewModel.findByIdAndDelete(productId).exec();
	}

	async findProductById(productId: string): Promise<ReviewDocument[]> {
		return this.reviewModel
			.find({ productId: productId /*new Types.ObjectId(productId).toHexString()*/ })
			.exec();
	}

	async deleteByProductId(productId: string): Promise<{ deletedCount: number }> {
		return this.reviewModel
			.deleteMany({
				productId: new Types.ObjectId(productId).toHexString(),
			})
			.exec();
	}
}
