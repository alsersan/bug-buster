import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type ProjectDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  dateCreated: Date;

  @Prop({ required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
