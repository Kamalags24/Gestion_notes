import { Component, OnInit } from '@angular/core';
import { Note } from '../../interfaces/note';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit{
  notes: Note[] = [];
  currentNote: Note = {
    id: 0, title: '', content: '', tags: [] 
  }
  editMode = false;
  isFormVisible = false;
  searchQuery= '';
  selectedTag = '';

  allTags: string[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
      this.updateAllTags();
    },
    error => console.error('Erreur de chargement des notes', error)
  );
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.currentNote = { id: 0, title: '', content: '', tags: [] };
      this.editMode = false;
    }
  }

  // showForm(): void {
  //   this.isFormVisible = true;
  //   this.currentNote = { id: 0, title: '', content: '', tags: [] };
  //   this.editMode = false;
  // }

  // hideForm(): void {
  //   this.isFormVisible = false;
  // }


  createNote(): void {
    // this.noteService.createNote(this.currentNote).subscribe(() => {
    //   this.loadNotes();
    //   this.cancelEdit();
    // });

    if (this.editMode) {
      this.noteService.updateNote(this.currentNote).subscribe(
        () => {
          this.loadNotes();
          this.toggleForm();
        },
        error => console.error('Erreur de sauvegarde', error)
      );
    } else {
      this.noteService.createNote(this.currentNote).subscribe(
        () => {
          this.loadNotes();
          this.toggleForm();
        },
        error => console.error('Erreur de création', error)
      );
    }
  }

  updateNote(note: Note): void {
    // this.noteService.updateNote(note).subscribe(() => {
    //   this.loadNotes();
    //   this.cancelEdit();
    // });

    if (this.editMode) {
      this.noteService.updateNote(this.currentNote).subscribe(
        () => {
          this.loadNotes();
          this.toggleForm();
        },
        error => console.error('Erreur de sauvegarde', error)
      );
    } else {
      this.noteService.createNote(this.currentNote).subscribe(
        () => {
          this.loadNotes();
          this.toggleForm();
        },
        error => console.error('Erreur de création', error)
      );
    }
  }

  editNote(note: Note): void {
    // this.editMode = true;
    // this.currentNote = {...note };

    this.currentNote = { ...note };
    this.editMode = true;
    this.isFormVisible = true;
  }

  cancelEdit(): void {
    this.currentNote = { id: 0, title: '', content: '', tags: [] };
    this.editMode = false;
    this.isFormVisible = false;
  }

  deleteNote(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      this.noteService.deleteNote(id).subscribe(() => 
        this.loadNotes(),
        error => console.error('Erreur de suppression', error)
      );
    }
  }

  updateAllTags() {
    const tagsSet = new Set<string>();
    this.notes.forEach(note => note.tags.forEach(tag => tagsSet.add(tag.trim())));
    this.allTags = Array.from(tagsSet);
  }

  filterByTag(note: Note): boolean {
    // return !this.selectedTag || note.tags.includes(this.selectedTag);
    if (!this.selectedTag) return true;
    return note.tags.includes(this.selectedTag);
  }

}
