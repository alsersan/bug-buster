import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema()
export class Members {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  projectManager: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  developers: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  qualityAssurance: User[];
}

export const MembersSchema = SchemaFactory.createForClass(Members);
