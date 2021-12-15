import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private uploadUrl = environment.uploadImgUrl;

  constructor(private http: HttpClient) {}

  uploadImage(data: FormData): Observable<any> {
    return this.http.post(this.uploadUrl, data);
  }
}
