import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from '../../models/chat.model';
import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:5000/api/chat-rooms'; // adjust if needed

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('buyerToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUserConversations(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/my-conversations`, {
      headers: this.getHeaders()
    });
  }

  getMessages(chatRoomId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${chatRoomId}/messages`, {
      headers: this.getHeaders()
    });
  }

  sendMessage(chatRoomId: string, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/${chatRoomId}/messages`, { content }, {
      headers: this.getHeaders()
    });
  }
}
