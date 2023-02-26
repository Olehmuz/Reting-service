import { Body, Controller, Delete, Post, Param, Get } from '@nestjs/common';
import { Model } from 'mongoose';

import { ReviewDocument } from './schemas/review.schema';

@Controller('review')
export class ReviewController {
	@Post('create')
	async create(@Body() dto: Omit<Model<ReviewDocument>, '_id'>): Promise<void> {}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<void> {}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string): Promise<void> {}
}
