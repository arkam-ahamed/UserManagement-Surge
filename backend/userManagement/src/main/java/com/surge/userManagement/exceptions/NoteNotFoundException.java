package com.surge.userManagement.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Project: pfl-social-network
 * Package: com.pfl.microservice.offer.exceptions
 * User: Arkam
 * Date: 3/23/2022
 * Time: 10:31 AM
 * Created with IntelliJ IDEA
 */
@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Note not found")
public class NoteNotFoundException extends RuntimeException {
    public NoteNotFoundException(String message) {
        super(message);
    }
}