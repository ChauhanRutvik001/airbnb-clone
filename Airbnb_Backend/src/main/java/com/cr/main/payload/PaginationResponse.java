package com.cr.main.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * For Pagination Information Send in Response we use pagiantion reponse object in api response
 */
@Getter
@Setter
@Builder
public class PaginationResponse {

    private int currentPage;
    private int pageSize;

    private long totalElements;
    private int totalPages;

    private boolean hasNext;
    private boolean hasPrevious;

    private boolean first;
    private boolean last;
}