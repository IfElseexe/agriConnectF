import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from '../../models/chat.model';
import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:5000/api/chat-rooms';

  constructor(private http: HttpClient) {}

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.baseUrl}`);
  }

  getMessages(chatId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/${chatId}/messages`);
  }

  sendMessage(chatId: string, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}/${chatId}/messages`, { content });
  }

  createChat(participantId: string): Observable<Chat> {
    return this.http.post<Chat>(`${this.baseUrl}`, { participantId });
  }
}
