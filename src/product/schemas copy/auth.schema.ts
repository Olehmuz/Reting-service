import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ timestamps: true })
export class Auth {
	@Prop()
	email: string;

	@Prop()
	passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
