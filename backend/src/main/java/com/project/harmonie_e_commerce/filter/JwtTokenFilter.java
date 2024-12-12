package com.project.harmonie_e_commerce.filter;

import com.project.harmonie_e_commerce.component.CustomAccessDeniedHandler;
import com.project.harmonie_e_commerce.component.CustomAuthenticationEntryPoint;
import com.project.harmonie_e_commerce.component.JwtTokenUtil;
import com.project.harmonie_e_commerce.model.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
    @Value("${api.prefix}")
    private String apiPrefix;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        //Allow all requests without authentication
        //filterChain.doFilter(request, response);
        try{
            if(isBypassToken(request)) {
                filterChain.doFilter(request, response); //enable bypass
                return;
            }
            final String authHeader = request.getHeader("Authorization");
            if(authHeader == null || !authHeader.startsWith("Bearer ")){
                throw new AuthenticationException("Unauthorized") {};
            }
            final String token = authHeader.substring(7);
            final String email = jwtTokenUtil.extractEmail(token);
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User user = (User)userDetailsService.loadUserByUsername(email);
                if(jwtTokenUtil.validateToken(token, user)){
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
            filterChain.doFilter(request, response);
        }catch (Exception e) {
            customAuthenticationEntryPoint.commence(request, response, new AuthenticationException("Unauthorized") {});
        }

    }
    private boolean isBypassToken(@NotNull HttpServletRequest request){
        //These are the endpoints that don't need authentication(token)
        final List<Pair<String, String>> bypassTokens = List.of(
                Pair.of(apiPrefix+"/users/login", "POST"),
                Pair.of(apiPrefix+"/users/register", "POST"),
                Pair.of(apiPrefix+"/users/forgot-password", "POST"),
                Pair.of(apiPrefix+"/users/update-password", "PUT"),
                Pair.of(apiPrefix+"/products", "GET"),
                Pair.of(apiPrefix+"/categories", "GET"),
                Pair.of(apiPrefix+"/categories/**", "GET"),
                Pair.of(apiPrefix+"/users/login-social", "POST")
                Pair.of("/images/", "GET")
        );
        for(Pair<String, String> bypassToken:bypassTokens){
            /*
            should use getServletPath() instead of getRequestURI()
            to get the path of the request
            because:
                getRequestURI() returns the full URI of the request
                        (including protocol, host, port, context path, servlet path và query string)
                getServletPath() returns the path of the request (Ex: /api/v1/users/login)
             */
            if(request.getServletPath().contains(bypassToken.getFirst()) &&
                    request.getMethod().equals(bypassToken.getSecond())){
                return true;
            }
        }
        return false;
    }
}