package com.cr.main.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AmenityCategoryDto {
    private String title;
    private List<AmenityDto> items;
}
