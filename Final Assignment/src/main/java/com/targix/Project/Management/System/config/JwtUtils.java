package com.targix.Project.Management.System.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration-ms}")
    private long expirationTimeMs;


    public String generateToken(String username, List<String> roles) {

        return Jwts.builder()
                .subject(username)
                .claim("roles",roles)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationTimeMs))
                .signWith(getSigningKey())
                .compact();
    }

    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String extractEmail(String token) {

        return getClaims(token).getSubject();
    }

    public List<String> extractRoles(String token) {

        return getClaims(token).get("roles",List.class);
    }

    private Claims getClaims(String token) {

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isTokenValid(String token) {
        try {
            getClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            logger.warn("JWT token is expired: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.warn("JWT token is malformed: {}", e.getMessage());
        } catch (Exception e) {
            logger.warn("JWT token validation failed: {}", e.getMessage());
        }
        return false;
    }
}
