package com.cr.main.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cr.main.dto.PropertyListingRequestDto;
import com.cr.main.dto.PropertyListingResponseDto;
import com.cr.main.entity.PropertyListingEntity;
import com.cr.main.mapper.PropertyListingMapper;
import com.cr.main.repository.PropertyListingRepository;
import com.cr.main.service.PropertyListingService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PropertyListingServiceImpl implements PropertyListingService {

    private final PropertyListingRepository propertyListingRepository;
    private final PropertyListingMapper propertyListingMapper;

    @Override
    @Transactional
    public PropertyListingResponseDto create(PropertyListingRequestDto requestDto) {
        PropertyListingEntity entity = propertyListingMapper.toEntity(requestDto);
        entity.setUuid(UUID.randomUUID());
        PropertyListingEntity savedEntity = propertyListingRepository.save(entity);
        return propertyListingMapper.toDto(savedEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public PropertyListingResponseDto getBySlug(String slug) {
        PropertyListingEntity entity = propertyListingRepository
                .findBySlugAndIsDeleteFalse(slug)
                .orElseThrow(() -> new EntityNotFoundException("Property listing not found for slug: " + slug));
        return propertyListingMapper.toDto(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropertyListingResponseDto> getAll() {
        return propertyListingRepository.findAll().stream()
                .filter(entity -> !Boolean.TRUE.equals(entity.getIsDelete()))
                .map(propertyListingMapper::toDto)
                .toList();
    }
}
