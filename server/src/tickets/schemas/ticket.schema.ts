import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Project } from 'src/projects/schemas/project.schema';
import { User } from 'src/users/schemas/user.schema';
import { Comment } from 'src/comments/schemas/comments.schema';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'pending', enum: ['pending', 'active', 'closed'] })
  status: string;

  @Prop({ required: true, enum: ['low', 'medium', 'high', 'immediate'] })
  priority: string;

  @Prop({ required: true, enum: ['bug', 'feature-request', 'other'] })
  type: string;

  @Prop({ required: true })
  dateCreated: Date;

  @Prop({ default: null })
  dateClosed: Date | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project: Project;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  assignedTo: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
