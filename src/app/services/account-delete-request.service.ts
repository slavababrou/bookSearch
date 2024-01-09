import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { accountDeleteRequest } from '../models/account-delete-request';

@Injectable({
  providedIn: 'root',
})
export class AccountDeleteRequestService {
  accountDeleteRequests: accountDeleteRequest[] | null = null;
  private apiUrl = 'http://localhost:3192/api/account-delete-request';

  constructor(private http: HttpClient) {}

  pushDeleteRequest(request: accountDeleteRequest) {
    this.accountDeleteRequests?.push(request);
  }

  createRequest(userId: number) {
    return this.http.post<accountDeleteRequest>(this.apiUrl, { userId });
  }

  deleteRequest(id: number) {
    return this.http.delete<accountDeleteRequest>(this.apiUrl, {
      params: { id: id },
    });
  }

  acceptRequest(id: number) {
    return this.http.post<string>(`${this.apiUrl}/accept`, { id });
  }

  declineRequest(id: number) {
    return this.http.post<string>(`${this.apiUrl}/decline`, { id });
  }

  fetchRequests() {
    return this.http.get<accountDeleteRequest[]>(this.apiUrl);
  }
}
