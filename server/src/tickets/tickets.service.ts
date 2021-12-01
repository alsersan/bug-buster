import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket, TicketDocument } from './schemas/ticket.schema';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const newTicket = await this.ticketModel.create(createTicketDto);
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
    return this.ticketModel.findByIdAndDelete(ticketId);
  }

  processQuery(queryResult) {
    return queryResult
      .select('-__v')
      .populate('project', '-__v -tickets -members._id')
      .populate('author', '-__v -password -tickets -projects');
  }
}
