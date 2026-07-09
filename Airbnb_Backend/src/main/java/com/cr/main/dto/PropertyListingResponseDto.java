package com.cr.main.dto;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PropertyListingResponseDto {
    private long id;
    private UUID uuid;
    private String slug;
    private String title;
    private PropertyListingContentDto content;
}
