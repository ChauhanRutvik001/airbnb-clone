package com.cr.main.validation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;


/**
 * Enum Validator Interface
 */
@Documented
@Constraint(validatedBy = EnumValidatorImpl.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface EnumValidator {
    // The Enum class to check against
    Class<? extends Enum<?>> enumClass();
    
    String message() default "Invalid value for this field";
    
    Class<?>[] groups() default {};
    
    Class<? extends Payload>[] payload() default {};
}
