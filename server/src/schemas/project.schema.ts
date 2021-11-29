import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Ticket } from './ticket.schema';

export type ProjectDocument = Project & Document;

@Schema()
class Members {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  projectManager: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  developers: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  qualityAssurance: User[];
}

const MembersSchema = SchemaFactory.createForClass(Members);

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  dateStarted: Date;

  @Prop({ required: true })
  dateEnded: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }] })
  Tickets: Ticket[];

  @Prop({ type: MembersSchema })
  members: Members;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
