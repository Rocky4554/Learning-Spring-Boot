package com.raunak.FirstProject.DTO;

public class ApiResponseDTO<T> {        
    private boolean success;
    private String message;
    private T data;
    private int status;
    
    public ApiResponseDTO() {}

    public ApiResponseDTO(boolean success, String message, T data, int status) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.status = status;
    }

    public ApiResponseDTO(boolean success, String message, int status) {
        this(success, message, null, status);
    }

    // getters and setters
}

