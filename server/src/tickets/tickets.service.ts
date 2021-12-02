import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { Project, ProjectDocument } from 'src/projects/schemas/project.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { addItemToList, deleteItemFromList } from 'src/utils/add-delete-items';
import { getChangedItems } from 'src/utils/compareArrays';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const newTicket = await this.ticketModel.create(createTicketDto);
    await addItemToList(
      newTicket.project,
      'tickets',
      newTicket._id,
      this.projectModel,
    );
    const queryResult = this.ticketModel.findById(newTicket._id);
    return this.processQuery(queryResult);
  }

  async getAllTickets(): Promise<Ticket[]> {
    const queryResult = this.ticketModel.find();
    return this.processQuery(queryResult);
  }

  async getTicketById(ticketId: string): Promise<Ticket> {
    const queryResult = this.ticketModel.findById(ticketId);
    return this.processQuery(queryResult);
  }

  async updateTicket(
    ticketId: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    if (updateTicketDto.hasOwnProperty('assignedTo')) {
      console.log('holi');
      const previousState = await this.ticketModel.findById(ticketId);
      const newState = updateTicketDto.assignedTo;
      const { removed, added } = getChangedItems(
        previousState.assignedTo,
        newState,
      );
      console.log('added', added);
      console.log('removed', removed);
      for (let i = 0; i < removed.length; i++) {
        await deleteItemFromList(
          removed[i],
          'tickets',
          ticketId,
          this.userModel,
        );
      }
      for (let i = 0; i < added.length; i++) {
        await addItemToList(added[i], 'tickets', ticketId, this.userModel);
      }
    }
    const queryResult = this.ticketModel.findByIdAndUpdate(
      ticketId,
      updateTicketDto,
      {
        new: true,
      },
    );
    return this.processQuery(queryResult);
  }

  async deleteTicket(ticketId: string) {
    const deletedTicket = await this.ticketModel.findByIdAndDelete(ticketId);
    await deleteItemFromList(
      deletedTicket.author,
      'tickets',
      deletedTicket._id,
      this.userModel,
    );
    await deleteItemFromList(
      deletedTicket.project,
      'tickets',
      deletedTicket._id,
      this.projectModel,
    );
    for (let i = 0; i < deletedTicket.assignedTo.length; i++) {
      await deleteItemFromList(
        deletedTicket.assignedTo[i],
        'tickets',
        deletedTicket._id,
        this.projectModel,
      );
    }
    return deletedTicket;
  }

  processQuery(queryResult) {
    return queryResult
      .select('-__v')
      .populate('project', 'name description')
      .populate('author assignedTo', '-__v -password -tickets -projects -role')
      .populate('modifications', '-__v -ticket');
  }
}
