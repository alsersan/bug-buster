import { Module } from '@nestjs/common';
import { ModificationsService } from './modifications.service';
import { ModificationsController } from './modifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Modification,
  ModificationSchema,
} from './schemas/modification.schema';
import { Ticket, TicketSchema } from 'src/tickets/schemas/ticket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Modification.name, schema: ModificationSchema },
      { name: Ticket.name, schema: TicketSchema },
    ]),
  ],
  controllers: [ModificationsController],
  providers: [ModificationsService],
})
export class ModificationsModule {}
