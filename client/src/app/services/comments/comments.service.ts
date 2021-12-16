import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, newComment } from 'src/app/models/comment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private commentsUrl = `${environment.baseUrl}/comments`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  createComment(ticket: newComment): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl, ticket, this.httpOptions);
  }
}
