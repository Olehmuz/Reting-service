import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPage, TopPageSchema } from './schemas/top-page.schema';
import { TopPageController } from './top-page.controller';

@Module({
	controllers: [TopPageController],
	imports: [
		ConfigModule,
		MongooseModule.forFeature([{ name: TopPage.name, schema: TopPageSchema }]),
	],
})
export class TopPageModule {}
