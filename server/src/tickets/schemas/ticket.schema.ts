import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Project } from 'src/projects/schemas/project.schema';
import { User } from 'src/users/schemas/user.schema';
import { Modification } from 'src/modifications/schemas/modification.schema';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ required: true })
  priority: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  dateCreated: string;

  @Prop({ default: null })
  dateClosed: string | null;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  project: Project;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  author: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  assignedTo: User[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Modification' }],
  })
  modifications: Modification[];
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
