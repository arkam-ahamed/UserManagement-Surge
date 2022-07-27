package com.surge.userManagement.service.Impl;

import com.surge.userManagement.dao.Note;
import com.surge.userManagement.dto.NoteDTO;
import com.surge.userManagement.exceptions.NoteNotFoundException;
import com.surge.userManagement.repository.NoteRepository;
import com.surge.userManagement.service.NoteService;
import org.bson.types.ObjectId;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NoteServiceImpl implements NoteService {
    private final NoteRepository noteRepository;

    private final DozerBeanMapper modelMapper;

    @Autowired
    public NoteServiceImpl(NoteRepository noteRepository, DozerBeanMapper modelMapper) {
        this.noteRepository = noteRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public NoteDTO addNote(NoteDTO noteDTO) {
        Note note = modelMapper.map(noteDTO, Note.class);
        Note noteResponse = noteRepository.save(note);
        return (modelMapper.map(noteResponse, NoteDTO.class));
    }

    @Override
    public List<NoteDTO> getAllNotes() {
        List<Note> noteList = noteRepository.findAll();
        return (noteList.stream()
                .map(entity -> modelMapper.map(entity, NoteDTO.class))
                .collect(Collectors.toList()));
    }

    @Override
    public NoteDTO updateNote(NoteDTO noteDTO) {
        Optional<Note> optionalNote = noteRepository.findById(new ObjectId(noteDTO.getId()));
        if (optionalNote.isPresent()) {
            Note note = modelMapper.map(noteDTO, Note.class);
            Note noteResponse = noteRepository.save(note);
            return (modelMapper.map(noteResponse, NoteDTO.class));
        } else {
            throw new NoteNotFoundException("note not found");
        }
    }

    @Override
    public void deleteNote(String id) {
        Optional<Note> optionalNote = noteRepository.findById(new ObjectId(id));
        if (optionalNote.isPresent()) {
            noteRepository.deleteById(new ObjectId(id));
        } else {
            throw new NoteNotFoundException("note not found");
        }
    }
}
