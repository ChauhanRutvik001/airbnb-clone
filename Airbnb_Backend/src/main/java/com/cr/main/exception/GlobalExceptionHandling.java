package com.cr.main.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.cr.main.payload.ApiResponse;

import jakarta.persistence.EntityNotFoundException;


/**
 * Global Exception Handling
 */
@RestControllerAdvice
public class GlobalExceptionHandling {

    /*
     * =========================================================
     * DTO VALIDATION ERRORS
     * =========================================================
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationErrors(
            MethodArgumentNotValidException ex) {

        Map<String, String> fieldErrors = new HashMap<>();

        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(error.getField(), error.getDefaultMessage());
        }

        ApiResponse<Map<String, String>> response =
                ApiResponse.<Map<String, String>>builder()
                        .success(false)
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message("Validation failed")
                        .data(fieldErrors)
                        .timestamp(LocalDateTime.now())
                        .build();

        return ResponseEntity.badRequest().body(response);
    }

    /*
     * =========================================================
     * PATH VARIABLE / REQUEST PARAM VALIDATION
     * =========================================================
     */
    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<ApiResponse<String>> handlePathValidation(
            HandlerMethodValidationException ex) {

        String message = ex.getAllErrors()
                .get(0)
                .getDefaultMessage();

        ApiResponse<String> response =
                ApiResponse.<String>builder()
                        .success(false)
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(message)
                        .data(null)
                        .timestamp(LocalDateTime.now())
                        .build();

        return ResponseEntity.badRequest().body(response);
    }

    /*
     * =========================================================
     * INVALID JSON / INVALID ENUM / INVALID DATE
     * =========================================================
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<String>> handleInvalidBody(
            HttpMessageNotReadableException ex) {
    	
    	System.out.println(ex.getMessage());
    	
    	
        ApiResponse<String> response =
                ApiResponse.<String>builder()
                        .success(false)
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message("Invalid request body or malformed JSON")
                        .data(null)
                        .timestamp(LocalDateTime.now())
                        .build();

        return ResponseEntity.badRequest().body(response);
    }

    /*
     * =========================================================
     * INVALID PATH VARIABLE TYPE
     * Example: /products/abc instead of Long
     * =========================================================
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse<String>> handleTypeMismatch(
            MethodArgumentTypeMismatchException ex) {

        String message = "Invalid value for parameter: " + ex.getName() + " : " + ex.getValue();
        
        ApiResponse<String> response =
                ApiResponse.<String>builder()
                        .success(false)
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(message)
                        .data(null)
                        .timestamp(LocalDateTime.now())
                        .build();

        return ResponseEntity.badRequest().body(response);
    }

    /*
     * =========================================================
     * MISSING REQUEST PARAM
     * =========================================================
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ApiResponse<String>> handleMissingParams(
            MissingServletRequestParameterException ex) {

        String message = ex.getParameterName() + " parameter is missing";

        ApiResponse<String> response =
                ApiResponse.<String>builder()
                        .success(false)
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(message)
                        .data(null)
                        .timestamp(LocalDateTime.now())
                        .build();

        return ResponseEntity.badRequest().body(response);
    }

    /*
     * =========================================================
     * ENTITY NOT FOUND
     * =========================================================
     */
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiResponse<String>> handleEntityNotFound(
            EntityNotFoundException ex) {

        ApiResponse<String> response =
                ApiResponse.<String>builder()
                        .success(false)
                        .status(HttpStatus.NOT_FOUND.value())
                        .message(ex.getMessage())
                        .data(null)
                        .timestamp(LocalDateTime.now())
                        .build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    /*
     * =========================================================
     * DATABASE CONSTRAINT ERRORS
     * unique key, foreign key etc.
     * =========================================================
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<String>> handleDatabaseErrors(
            DataIntegrityViolationException ex) {

        ApiResponse<String> response =
                ApiResponse.<String>builder()
                        .success(false)
                        .status(HttpStatus.CONFLICT.value())
                        .message("Database constraint violation")
                        .data(null)
                        .timestamp(LocalDateTime.now())
                        .build();

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    /*
     * =========================================================
     * METHOD NOT ALLOWED
     * Example: POST on GET endpoint
     * =========================================================
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiResponse<String>> handleMethodNotAllowed(
            HttpRequestMethodNotSupportedException ex) {

        ApiResponse<String> response =
                ApiResponse.<String>builder()
                        .success(false)
                        .status(HttpStatus.METHOD_NOT_ALLOWED.value())
                        .message("HTTP method not supported")
                        .data(null)
                        .timestamp(LocalDateTime.now())
                        .build();

        return ResponseEntity
                .status(HttpStatus.METHOD_NOT_ALLOWED)
                .body(response);
    }

    /*
     * =========================================================
     * URL NOT FOUND
     * =========================================================
     */
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ApiResponse<String>> handleNotFound(
            NoHandlerFoundException ex) {

        ApiResponse<String> response =
                ApiResponse.<String>builder()
                        .success(false)
                        .status(HttpStatus.NOT_FOUND.value())
                        .message("API endpoint not found")
                        .data(null)
                        .timestamp(LocalDateTime.now())
                        .build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    
    /*
     * =========================================================
     * RUNTIME EXCEPTION NOT FOUND
     * =========================================================
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<String>> runTimeException(
            RuntimeException ex) {
    
        ApiResponse<String> response =
                ApiResponse.<String>builder()
                        .success(false)
                        .status(HttpStatus.NOT_FOUND.value())
                        .message(ex.getMessage())
                        .data(null)
                        .timestamp(LocalDateTime.now())
                        .build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    /*
     * =========================================================
     * GLOBAL EXCEPTION
     * =========================================================
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleGlobalException(
            Exception ex) {

        ex.printStackTrace();

        ApiResponse<String> response =
                ApiResponse.<String>builder()
                        .success(false)
                        .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .message("Something went wrong")
                        .data(null)
                        .timestamp(LocalDateTime.now())
                        .build();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }
}