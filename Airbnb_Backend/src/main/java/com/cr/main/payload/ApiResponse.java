package com.cr.main.payload;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Generic API Response
 */
@Getter
@Setter
@Builder
public class ApiResponse<T> {
	private boolean success;
	private int status;
	private String message;
	
	private T data;
	
	private PaginationResponse paginationResponse;
	
	@Builder.Default
	private LocalDateTime timestamp = LocalDateTime.now();
}
