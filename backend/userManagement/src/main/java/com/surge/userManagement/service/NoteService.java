package com.surge.userManagement.service;

import com.surge.userManagement.dto.NoteDTO;

import java.util.List;

public interface NoteService {
    NoteDTO addNote(NoteDTO noteDTO);

    List<NoteDTO> getAllNotes();

    NoteDTO updateNote(NoteDTO noteDTO);

    void deleteNote(String id);
}
