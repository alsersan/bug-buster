import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { roles } from 'src/utils/roles';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Roles(roles.admin, roles.projectManager, roles.qualityAssurance)
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.getTicketById(id);
  }

  @Roles(roles.admin, roles.projectManager)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.updateTicket(id, updateTicketDto);
  }

  @Roles(roles.admin)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ticketsService.deleteTicket(id);
  }
}
