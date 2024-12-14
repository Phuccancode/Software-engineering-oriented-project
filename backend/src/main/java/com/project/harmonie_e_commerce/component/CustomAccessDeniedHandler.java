package com.project.harmonie_e_commerce.component;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.harmonie_e_commerce.response.RestResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper mapper;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {
        // Đặt mã trạng thái HTTP là 403
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType("application/json;charset=UTF-8");

        // Tạo đối tượng phản hồi tùy chỉnh
        RestResponse<Object> res = new RestResponse<>();
        res.setStatusCode(HttpStatus.FORBIDDEN.value());
        String errorMessage = Optional.ofNullable(accessDeniedException.getCause())
                .map(Throwable::getMessage)
                .orElse(accessDeniedException.getMessage());

        res.setError(errorMessage);
        res.setMessage("Bạn không có quyền truy cập tài nguyên này.");

        // Ghi JSON phản hồi vào response
        mapper.writeValue(response.getWriter(), res);
    }
}
