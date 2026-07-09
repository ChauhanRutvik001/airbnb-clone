package com.cr.main.config;

import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.cr.main.dto.AmenityCategoryDto;
import com.cr.main.dto.AmenityDto;
import com.cr.main.dto.GalleryImageDto;
import com.cr.main.dto.PerkDto;
import com.cr.main.dto.PropertyListingContentDto;
import com.cr.main.dto.PropertyListingRequestDto;
import com.cr.main.dto.SleepCardDto;
import com.cr.main.repository.PropertyListingRepository;
import com.cr.main.service.PropertyListingService;

@Configuration
public class PropertyListingSeedConfig {
    @Bean
    CommandLineRunner seedDefaultListing(PropertyListingRepository repository, PropertyListingService service) {
        return args -> {
            // Check if default listing already exists
            if (repository.existsBySlugAndIsDeleteFalse("default-listing")) {
                // If exists but corrupted, find and delete it manually
                var existing = repository.findBySlugAndIsDeleteFalse("default-listing");
                if (existing.isPresent()) {
                    repository.delete(existing.get());
                }
            }
            
            PropertyListingRequestDto request = new PropertyListingRequestDto();
            request.setSlug("default-listing");
            request.setTitle("Romantic Jacuzzi 1BHK Candolim | Mirashya UG10");
            request.setContent(defaultContent());
            service.create(request);
        };
    }
    private PropertyListingContentDto defaultContent() {
        PropertyListingContentDto content = new PropertyListingContentDto();
        content.setListingTabs(List.of("Photos", "Amenities", "Reviews", "Location"));
        GalleryImageDto mainImage = new GalleryImageDto();
        mainImage.setSrc("https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80");
        mainImage.setAlt("Spacious living room");
        mainImage.setClassName("col-span-2 row-span-2");
        mainImage.setOverlay(false);
        GalleryImageDto image2 = new GalleryImageDto();
        image2.setSrc("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80");
        image2.setAlt("Seating area");
        image2.setOverlay(false);
        GalleryImageDto image3 = new GalleryImageDto();
        image3.setSrc("https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80");
        image3.setAlt("Jacuzzi");
        image3.setOverlay(false);
        GalleryImageDto image4 = new GalleryImageDto();
        image4.setSrc("https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1000&q=80");
        image4.setAlt("Bedroom");
        image4.setOverlay(false);
        GalleryImageDto image5 = new GalleryImageDto();
        image5.setSrc("https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1000&q=80");
        image5.setAlt("Building exterior");
        image5.setOverlay(true);
        content.setGalleryImages(List.of(mainImage, image2, image3, image4, image5));
        PerkDto perk1 = new PerkDto();
        perk1.setIcon("wind");
        perk1.setTitle("Outdoor entertainment");
        perk1.setDescription("The pool and alfresco dining are great for summer trips.");
        PerkDto perk2 = new PerkDto();
        perk2.setIcon("wind");
        perk2.setTitle("Designed for staying cool");
        perk2.setDescription("Beat the heat with the A/C and ceiling fan.");
        PerkDto perk3 = new PerkDto();
        perk3.setIcon("home");
        perk3.setTitle("Self check-in");
        perk3.setDescription("You can check in with the building staff.");
        content.setPerks(List.of(perk1, perk2, perk3));
        SleepCardDto sleep1 = new SleepCardDto();
        sleep1.setSrc("https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1100&q=80");
        sleep1.setTitle("Bedroom");
        sleep1.setSubtitle("1 double bed");
        SleepCardDto sleep2 = new SleepCardDto();
        sleep2.setSrc("https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1100&q=80");
        sleep2.setTitle("Living room");
        sleep2.setSubtitle("1 sofa");
        content.setSleepCards(List.of(sleep1, sleep2));
        content.setOctoberWeeks(List.of(
            List.of(" ", " ", " ", " ", "1", "2", "3"),
            List.of("4", "5", "6", "7", "8", "9", "10"),
            List.of("11", "12", "13", "14", "15", "16", "17"),
            List.of("18", "19", "20", "21", "22", "23", "24"),
            List.of("25", "26", "27", "28", "29", "30", "31")));
        content.setNovemberWeeks(List.of(
            List.of(" ", " ", " ", " ", " ", " ", "1"),
            List.of("2", "3", "4", "5", "6", "7", "8"),
            List.of("9", "10", "11", "12", "13", "14", "15"),
            List.of("16", "17", "18", "19", "20", "21", "22"),
            List.of("23", "24", "25", "26", "27", "28", "29")));
        content.setDescriptionParagraphs(List.of(
            "Plan your relaxing holiday at Amor De Goa by Mirashya Homes. Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi for the perfect unwind.",
            "Enjoy high-speed WiFi, Smart TV, pet-friendly comfort, and stylish interiors. Just minutes from Candolim Beach, popular cafes, restaurants, and nightlife."));
        content.setFeaturedAmenities(List.of(
            amenity("wifi", "WiFi"),
            amenity("wind", "Air conditioning"),
            amenity("tv", "TV"),
            amenity("home", "Kitchen"),
            amenity("mapPin", "Free parking on premises"),
            amenity("home", "Pool"),
            amenity("home", "Hot tub"),
            amenity("check", "Self check-in")));
        AmenityCategoryDto bathroom = new AmenityCategoryDto();
        bathroom.setTitle("Bathroom");
        bathroom.setItems(List.of(
            amenity("wind", "Hair dryer"),
            amenity("droplet", "Shampoo"),
            amenity("droplet", "Conditioner"),
            amenity("droplet", "Hot water")));
        AmenityCategoryDto safety = new AmenityCategoryDto();
        safety.setTitle("Home Safety");
        safety.setItems(List.of(
            amenity("shield", "Smoke alarm"),
            amenity("shield", "Carbon monoxide alarm"),
            amenity("shield", "First aid kit"),
            amenity("camera", "Exterior security cameras on property")));
        AmenityCategoryDto services = new AmenityCategoryDto();
        services.setTitle("Services");
        services.setItems(List.of(
            amenity("check", "Self check-in"),
            amenity("check", "Cleaning available during stay"),
            amenity("lock", "Long-term stays allowed"),
            amenity("check", "Pets allowed")));
        content.setAmenityCategories(List.of(bathroom, safety, services));
        return content;
    }
    private AmenityDto amenity(String icon, String label) {
        AmenityDto dto = new AmenityDto();
        dto.setIcon(icon);
        dto.setLabel(label);
        return dto;
    }
}