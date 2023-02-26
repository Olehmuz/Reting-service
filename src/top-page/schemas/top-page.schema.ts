import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopPageDocument = HydratedDocument<TopPage>;

export enum TopPageCategories {
	Courses,
	Services,
	Books,
	Products,
}
class TopPageAdvantages {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

class TopPageCareers {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: string;

	@Prop()
	middleSalary: string;

	@Prop()
	seniorSalary: string;
}

@Schema({ timestamps: true })
export class TopPage {
	@Prop({
		type: Number,
		enum: TopPageCategories,
	})
	category: TopPageCategories;

	@Prop()
	subCategory: string;

	@Prop()
	title: string;

	@Prop()
	productCategory: string;

	@Prop()
	careers?: TopPageCareers;

	@Prop([TopPageAdvantages])
	advantages: TopPageAdvantages[];

	@Prop([String])
	tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
