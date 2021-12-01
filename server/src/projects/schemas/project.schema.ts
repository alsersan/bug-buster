import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Ticket } from 'src/tickets/ticket.schema';
import { Members, MembersSchema } from './members.schema';
import { User } from 'src/users/schemas/user.schema';

export type ProjectDocument = Project & Document;
@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'active' })
  status: string;

  @Prop()
  dateStarted: Date;

  @Prop({ default: null })
  dateEnded: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }] })
  Tickets: Ticket[];

  @Prop({ type: MembersSchema })
  members: Members;

  /* members: {

  }
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  members: User; */
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
