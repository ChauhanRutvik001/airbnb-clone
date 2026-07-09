package com.cr.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cr.main.entity.PropertyListingEntity;

public interface PropertyListingRepository extends JpaRepository<PropertyListingEntity, Long> {
    Optional<PropertyListingEntity> findBySlugAndIsDeleteFalse(String slug);
    boolean existsBySlugAndIsDeleteFalse(String slug);
}
