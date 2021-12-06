import { Controller, Post, Body } from '@nestjs/common';
import { ModificationsService } from './modifications.service';
import { CreateModificationDto } from './dto/create-modification.dto';

@Controller('modifications')
export class ModificationsController {
  constructor(private readonly modificationsService: ModificationsService) {}

  @Post()
  async create(@Body() createModificationDto: CreateModificationDto) {
    return await this.modificationsService.createModification(
      createModificationDto,
    );
  }
}
