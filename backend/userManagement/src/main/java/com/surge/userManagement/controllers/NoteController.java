package com.surge.userManagement.controllers;

import com.surge.userManagement.dto.NoteDTO;
import com.surge.userManagement.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/note")
public class NoteController {
    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping()
    public NoteDTO addNote(@RequestBody NoteDTO noteDTO) {
        return noteService.addNote(noteDTO);
    }

    @GetMapping()
    public List<NoteDTO> getAllNotes() {
        return noteService.getAllNotes();
    }

    @PutMapping
    public NoteDTO updateNote(@RequestBody NoteDTO noteDTO) {
        return noteService.updateNote(noteDTO);
    }

    @DeleteMapping("{id}")
    public void deleteNoteById(@PathVariable String id) {
        noteService.deleteNote(id);
    }

}
