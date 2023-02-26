import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { Model } from 'mongoose';
import { FindProductDto } from './dto/findProduct.dto';
import { ProductDocument } from './schemas/product.schema';

@Controller('product')
export class ProductController {
	@Post('create')
	async create(@Body() dto: Omit<Model<ProductDocument>, '_id'>): Promise<void> {}

	@Get(':id')
	async get(@Param('id') id: string): Promise<void> {}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: Model<ProductDocument>): Promise<void> {}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<void> {}

	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto): Promise<void> {}
}
