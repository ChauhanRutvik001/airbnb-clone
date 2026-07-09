package com.cr.main.mapper;

import com.cr.main.dto.PropertyListingRequestDto;
import com.cr.main.dto.PropertyListingResponseDto;
import com.cr.main.entity.PropertyListingEntity;

public interface PropertyListingMapper {
    PropertyListingEntity toEntity(PropertyListingRequestDto requestDto);
    PropertyListingResponseDto toDto(PropertyListingEntity entity);
}
