import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = "http://localhost:8080/api/notes";

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  createNote(note: Note): Observable<Note> {
    if (note.id) {
      return this.http.put<Note>(`${this.apiUrl}/${note.id}`, note);
    } else {
      return this.http.post<Note>(this.apiUrl, note);
    }
  }

  updateNote(note: Note): Observable<Note> {
    if (note.id) {
      return this.http.put<Note>(`${this.apiUrl}/${note.id}`, note);
    } else {
      return this.http.post<Note>(this.apiUrl, note);
    }
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
