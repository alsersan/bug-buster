import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Ticket } from 'src/tickets/schemas/ticket.schema';

export type ModificationDocument = Modification & Document;

@Schema()
export class Modification {
  @Prop({ required: true })
  modifiedProperty: string;

  @Prop({ required: true })
  oldValue: string;

  @Prop({ required: true })
  newValue: string;

  @Prop({ required: true })
  dateCreated: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' })
  ticket: Ticket;
}

export const ModificationSchema = SchemaFactory.createForClass(Modification);
