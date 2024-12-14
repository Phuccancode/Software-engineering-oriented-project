package com.project.harmonie_e_commerce.exception;

import com.project.harmonie_e_commerce.response.RestResponse;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Xử lý lỗi Authentication (lỗi xác thực)
    @ExceptionHandler(value = {
            BadCredentialsException.class,
            UsernameNotFoundException.class,
            AccountExpiredException.class,
            CredentialsExpiredException.class,
            LockedException.class,
            DisabledException.class
    })
    public ResponseEntity<RestResponse<Object>> handleAuthenticationException(Exception e) {
        RestResponse<Object> res = new RestResponse<>();
        res.setStatusCode(HttpStatus.UNAUTHORIZED.value());
        res.setError("Authentication Error");
        res.setMessage(e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
    }

    // Xử lý ngoại lệ dữ liệu không tìm thấy
    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<RestResponse<Object>> handleDataNotFoundException(Exception e) {
        RestResponse<Object> res = new RestResponse<>();
        res.setStatusCode(HttpStatus.NOT_FOUND.value());
        res.setError("Not Found");
        res.setMessage(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<RestResponse<Object>> handleAccessDeniedException(Exception e) {
        RestResponse<Object> res = new RestResponse<>();
        res.setStatusCode(HttpStatus.FORBIDDEN.value());
        res.setError("Access Denied");
        res.setMessage(e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(res);
    }

    @ExceptionHandler(InsufficientAuthenticationException.class)
    public ResponseEntity<RestResponse<Object>> handleInsufficientAuthenticationException(Exception e) {
        RestResponse<Object> res = new RestResponse<>();
        res.setStatusCode(HttpStatus.UNAUTHORIZED.value());
        res.setError("Insufficient Authentication");
        res.setMessage(e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
    }

    // Xử lý ngoại lệ validate dữ liệu không hợp lệ
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<RestResponse<Object>> handleValidationError(MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();

        // Tạo danh sách lỗi từ các trường validate
        List<String> errors = fieldErrors.stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());

        RestResponse<Object> res = new RestResponse<>();
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setError("Validation Error");
        res.setMessage(errors.isEmpty() ? "Validation failed" : String.join(", ", errors));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(UnsupportMediaException.class)
    public ResponseEntity<RestResponse<Object>> handleUnsupportMediaException(Exception e) {
        RestResponse<Object> res = new RestResponse<>();
        res.setStatusCode(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value());
        res.setError("Unsupport Media");
        res.setMessage(e.getMessage());
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(res);
    }
    @ExceptionHandler(FileTooLargeException.class)
    public ResponseEntity<RestResponse<Object>> handleFileTooLargeException(Exception e) {
        RestResponse<Object> res = new RestResponse<>();
        res.setStatusCode(HttpStatus.PAYLOAD_TOO_LARGE.value());
        res.setError("File Too Large");
        res.setMessage(e.getMessage());
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(res);
    }
    // Xử lý ngoại lệ chung
    @ExceptionHandler(Exception.class)
    public ResponseEntity<RestResponse<Object>> handleGeneralException(Exception ex) {
        RestResponse<Object> res = new RestResponse<>();
        res.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        res.setError("Internal Server Error");
        res.setMessage("An unexpected error occurred: " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
    }
}
