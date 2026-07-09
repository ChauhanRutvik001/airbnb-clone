package com.cr.main.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GalleryImageDto {
    private String src;
    private String alt;
    private String className;
    private Boolean overlay;
}
