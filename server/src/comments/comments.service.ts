import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from 'src/tickets/schemas/ticket.schema';
import { addItemToListFromBeginning } from 'src/utils/add-remove-items';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment, CommentDocument } from './schemas/comments.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}
  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = await this.commentModel.create(createCommentDto);
    await addItemToListFromBeginning(
      newComment.ticket,
      'comments',
      newComment._id,
      this.ticketModel,
    );
    const queryResult = this.commentModel.findById(newComment._id);
    return this.processQuery(queryResult);
  }

  processQuery(queryResult) {
    return queryResult
      .select('-__v')
      .populate('author', '-__v -password -tickets -projects');
  }
}
