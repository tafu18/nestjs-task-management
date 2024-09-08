import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    username: string;

    @Prop()
    age: number;
    
    @Prop({ required: true })
    password: string;

    @Prop({ default: 'user' })
    role: string;
    
}

export const UserSchema = SchemaFactory.createForClass(User)