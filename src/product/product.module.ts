import { Body, Module, Post } from '@nestjs/common';
import { ProductModel } from './product.model';
import { ProductController } from './product.controller';

@Module({
	controllers: [ProductController],
})
export class ProductModule {}
