package com.fbcq.be.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record EmailRequest(
        @NotNull(message = "Email cannot be null")
        @Email(message = "Invalid email format")
                String email
) {
}
