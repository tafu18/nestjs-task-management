import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { TaskStatus } from "../task-status.enum";
import { User } from "src/users/schemas/users.schema";

@Schema({ timestamps: true })
export class Task extends Document {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true, enum: TaskStatus })
    status: TaskStatus;

    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'User', required: true})
    user_id: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);