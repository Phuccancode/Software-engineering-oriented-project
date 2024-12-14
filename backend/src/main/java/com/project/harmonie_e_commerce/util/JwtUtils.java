package com.project.harmonie_e_commerce.util;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.util.Map;
public class JwtUtils {

    public static Map<String,String> decodeIdToken(String idToken) {
        DecodedJWT jwt = JWT.decode(idToken);
        String email = jwt.getClaim("email").asString();
        String sub = jwt.getClaim("sub").asString();
        String name = jwt.getClaim("name").asString();
        return Map.of("email", email,"name",name, "sub", sub);
    }

    public static Map<String,String> decodeWebToken(String idToken) {
        DecodedJWT jwt = JWT.decode(idToken);
        String email = jwt.getClaim("email").asString();
        String sub = jwt.getClaim("sub").asString();
        return Map.of("email", email, "sub", sub);
    }

    public static void main(String[] args) {
        System.out.println(decodeIdToken("eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6InRyYW5ob25ncGh1Y0BnbWFpbC5jb20iLCJzdWIiOiJ0cmFuaG9uZ3BodWNAZ21haWwuY29tIiwiZXhwIjoxNzMzODY3NDk4fQ.StdbF11ocaOxL7gKaLlE89Ss4IeCgRuiSp798Wj5KBMC5T7-qwkHM8MPsf_pwIQYC8JJjxCK4piWrmEAd_Qp5g").size());
    }
}
