import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateModificationDto } from './dto/create-modification.dto';
import { Ticket, TicketDocument } from 'src/tickets/schemas/ticket.schema';
import {
  Modification,
  ModificationDocument,
} from './schemas/modification.schema';

@Injectable()
export class ModificationsService {
  constructor(
    @InjectModel(Modification.name)
    private modificationModel: Model<ModificationDocument>,
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  async createModification(createModificationDto: CreateModificationDto) {
    const newModification = await this.modificationModel.create(
      createModificationDto,
    );
    const queryResult = this.modificationModel.findById(newModification._id);
    return this.processQuery(queryResult);
  }

  processQuery(queryResult) {
    return queryResult.select('-__v');
  }
}
