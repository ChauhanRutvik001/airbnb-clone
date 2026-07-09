package com.cr.main.service;

import java.util.List;

import com.cr.main.dto.PropertyListingRequestDto;
import com.cr.main.dto.PropertyListingResponseDto;

public interface PropertyListingService {
    PropertyListingResponseDto create(PropertyListingRequestDto requestDto);
    PropertyListingResponseDto getBySlug(String slug);
    List<PropertyListingResponseDto> getAll();
}
