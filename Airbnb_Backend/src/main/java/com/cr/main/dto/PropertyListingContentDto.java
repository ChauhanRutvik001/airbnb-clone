package com.cr.main.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PropertyListingContentDto {
    private List<String> listingTabs;
    private List<GalleryImageDto> galleryImages;
    private List<PerkDto> perks;
    private List<SleepCardDto> sleepCards;
    private List<List<String>> octoberWeeks;
    private List<List<String>> novemberWeeks;
    private List<String> descriptionParagraphs;
    private List<AmenityDto> featuredAmenities;
    private List<AmenityCategoryDto> amenityCategories;
}
