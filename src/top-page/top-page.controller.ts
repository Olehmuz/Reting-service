import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TopPageDto } from './dto/top-page.dto';
import { ConfigService } from '@nestjs/config';
import { TopPageDocument } from './schemas/top-page.schema';
import { Model } from 'mongoose';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly configService: ConfigService) {}

	@Post('create')
	async create(@Body() dto: Omit<Model<TopPageDocument>, '_id'>): Promise<void> {
		return this.configService.get('MONGO_USER');
	}

	@Get(':id')
	async get(@Param('id') id: string): Promise<void> {}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: TopPageDto): Promise<void> {}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<void> {}

	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: TopPageDto): Promise<void> {}
}
