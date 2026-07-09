package com.cr.main.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cr.main.dto.PropertyListingRequestDto;
import com.cr.main.dto.PropertyListingResponseDto;
import com.cr.main.payload.ApiResponse;
import com.cr.main.service.PropertyListingService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/listings")
@RequiredArgsConstructor
@Validated
public class PropertyListingController {

    private final PropertyListingService propertyListingService;

    @PostMapping
    public ResponseEntity<ApiResponse<PropertyListingResponseDto>> create(
            @Valid @RequestBody PropertyListingRequestDto requestDto) {

        PropertyListingResponseDto created = propertyListingService.create(requestDto);
        ApiResponse<PropertyListingResponseDto> response = ApiResponse.<PropertyListingResponseDto>builder()
                .success(true)
                .status(HttpStatus.CREATED.value())
                .message("Property listing created")
                .data(created)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<PropertyListingResponseDto>> getBySlug(@PathVariable String slug) {
        PropertyListingResponseDto listing = propertyListingService.getBySlug(slug);
        ApiResponse<PropertyListingResponseDto> response = ApiResponse.<PropertyListingResponseDto>builder()
                .success(true)
                .status(HttpStatus.OK.value())
                .message("Property listing fetched")
                .data(listing)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PropertyListingResponseDto>>> getAll() {
        List<PropertyListingResponseDto> listings = propertyListingService.getAll();
        ApiResponse<List<PropertyListingResponseDto>> response = ApiResponse.<List<PropertyListingResponseDto>>builder()
                .success(true)
                .status(HttpStatus.OK.value())
                .message("Property listings fetched")
                .data(listings)
                .build();
        return ResponseEntity.ok(response);
    }
}
