import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Ticket } from 'src/tickets/schemas/ticket.schema';
import { Members, MembersSchema } from './members.schema';

export type ProjectDocument = Project & Document;
@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'active', enum: ['active', 'closed'] })
  status: string;

  @Prop()
  dateCreated: Date;

  @Prop({ default: null })
  dateClosed: Date | null;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }] })
  tickets: Ticket[];

  @Prop({ type: MembersSchema })
  members: Members;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
