package com.cr.main.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PropertyListingRequestDto {
    @NotBlank(message = "slug is required")
    private String slug;

    @NotBlank(message = "title is required")
    private String title;

    @NotNull(message = "content is required")
    @Valid
    private PropertyListingContentDto content;
}
