package com.cr.main.mapper.impl;

import org.springframework.stereotype.Component;

import com.cr.main.dto.PropertyListingContentDto;
import com.cr.main.dto.PropertyListingRequestDto;
import com.cr.main.dto.PropertyListingResponseDto;
import com.cr.main.entity.PropertyListingEntity;
import com.cr.main.mapper.PropertyListingMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PropertyListingMapperImpl implements PropertyListingMapper {

    private final ObjectMapper objectMapper;

    @Override
    public PropertyListingEntity toEntity(PropertyListingRequestDto requestDto) {
        PropertyListingEntity entity = new PropertyListingEntity();
        entity.setSlug(requestDto.getSlug());
        entity.setTitle(requestDto.getTitle());
        entity.setContentJson(writeJson(requestDto.getContent()));
        return entity;
    }

    @Override
    public PropertyListingResponseDto toDto(PropertyListingEntity entity) {
        PropertyListingResponseDto dto = new PropertyListingResponseDto();
        dto.setId(entity.getId());
        dto.setUuid(entity.getUuid());
        dto.setSlug(entity.getSlug());
        dto.setTitle(entity.getTitle());
        dto.setContent(readJson(entity.getContentJson()));
        return dto;
    }

    private String writeJson(PropertyListingContentDto content) {
        try {
            return objectMapper.writeValueAsString(content);
        } catch (JsonProcessingException ex) {
            throw new RuntimeException("Failed to serialize listing content", ex);
        }
    }

    private PropertyListingContentDto readJson(String contentJson) {
        try {
            return objectMapper.readValue(contentJson, PropertyListingContentDto.class);
        } catch (JsonProcessingException ex) {
            throw new RuntimeException("Failed to deserialize listing content", ex);
        }
    }
}
