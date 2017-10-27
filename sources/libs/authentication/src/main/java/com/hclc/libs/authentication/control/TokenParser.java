package com.hclc.libs.authentication.control;

import com.hclc.libs.authentication.entity.AuthorizedUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;

import java.util.Optional;

import static io.jsonwebtoken.SignatureAlgorithm.HS512;

public class TokenParser {

    private static final String EMAIL_CLAIM_KEY = "email";

    public Optional<AuthorizedUser> parse(String cuiAuthenticationToken, String jwtSignature) {
        try {
            return tryParsing(cuiAuthenticationToken, jwtSignature);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    private Optional<AuthorizedUser> tryParsing(String cuiAuthenticationToken, String jwtSignature) {
        Jws<Claims> claims = Jwts.parser()
                .setSigningKey(jwtSignature)
                .parseClaimsJws(cuiAuthenticationToken);

        if (!HS512.getValue().equals(claims.getHeader().getAlgorithm()))
            return Optional.empty();

        if (!subjectIsSpecifiedIn(claims) || !emailIsSpecifiedIn(claims))
            return Optional.empty();

        return Optional.of(new AuthorizedUser(
                claims.getBody().getSubject(),
                claims.getBody().get(EMAIL_CLAIM_KEY, String.class)
        ));
    }

    private boolean subjectIsSpecifiedIn(Jws<Claims> claims) {
        return claims.getBody().getSubject() != null && !claims.getBody().getSubject().trim().isEmpty();
    }

    private boolean emailIsSpecifiedIn(Jws<Claims> claims) {
        return claims.getBody().get("email", String.class) != null && !claims.getBody().get("email", String.class).trim().isEmpty();
    }
}
