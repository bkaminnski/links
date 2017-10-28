package com.hclc.links.users.authentication.control;

import com.hclc.libs.authentication.entity.AuthenticatedUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import static java.time.Instant.now;
import static java.util.Date.from;

public class TokenCreator {

    public String createFrom(AuthenticatedUser authenticatedUser, String jwtSignature) {
        return Jwts.builder()
                .setSubject(authenticatedUser.getId())
                .claim("email", authenticatedUser.getEmail())
                .setExpiration(from(now().plusSeconds(60)))
                .signWith(SignatureAlgorithm.HS512, jwtSignature)
                .compact();
    }
}
