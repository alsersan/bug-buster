import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { Project, ProjectDocument } from 'src/projects/schemas/project.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const newTicket = await this.ticketModel.create(createTicketDto);
    await this.addTicketToUser(newTicket.author, newTicket._id);
    await this.addTicketToProject(newTicket.project, newTicket._id);
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
    const deletedTicket = await this.ticketModel.findByIdAndDelete(ticketId);
    await this.removeTicketFromUser(deletedTicket.author, deletedTicket._id);
    await this.removeTicketFromProject(
      deletedTicket.project,
      deletedTicket._id,
    );
    for (let i = 0; i < deletedTicket.assignedTo.length; i++) {
      await this.removeTicketFromUser(
        deletedTicket.assignedTo[i],
        deletedTicket._id,
      );
    }
    return deletedTicket;
  }

  async addTicketToUser(userId, newTicketId) {
    const user = await this.userModel.findById(userId);
    user.tickets = [...user.tickets, newTicketId];
    user.save();
  }

  async removeTicketFromUser(userId, removedTicketId) {
    const user = await this.userModel.findById(userId);
    user.tickets = user.tickets.filter((el) => {
      return el.toString() !== removedTicketId;
    });
    user.save();
  }

  async addTicketToProject(projectId, newTicketId) {
    const project = await this.projectModel.findById(projectId);
    project.tickets = [...project.tickets, newTicketId];
    project.save();
  }

  async removeTicketFromProject(projectId, removedTicketId) {
    const project = await this.projectModel.findById(projectId);
    project.tickets = project.tickets.filter((el) => {
      return el.toString() !== removedTicketId;
    });
    project.save();
  }

  processQuery(queryResult) {
    return queryResult
      .select('-__v')
      .populate('project', 'name description')
      .populate('author', '-__v -password -tickets -projects -role');
  }
}
