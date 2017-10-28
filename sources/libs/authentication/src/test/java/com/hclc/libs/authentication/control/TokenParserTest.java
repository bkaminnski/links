package com.hclc.libs.authentication.control;

import com.hclc.libs.authentication.control.fixtures.TokenParserParameters;
import com.hclc.libs.authentication.entity.AuthenticatedUser;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.Optional;
import java.util.stream.Stream;

import static com.hclc.libs.authentication.control.fixtures.TokenParserParameters.parameters;
import static io.jsonwebtoken.SignatureAlgorithm.*;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.params.provider.Arguments.of;

class TokenParserTest {

    private TokenParser tokenParser;

    @BeforeEach
    void beforeEach() {
        tokenParser = new TokenParser();
    }

    @Test
    void whenCuiAuthenticationTokenIsValid_shouldReturnValidAuthenticatedUser() {
        TokenParserParameters validParameters = parameters()
                .id("validId")
                .email("valid@email.com")
                .jwtParseSignature("matchingJwtSignature")
                .signatureAlgorithm(HS512)
                .build();
        String cuiAuthenticationToken = createCuiAuthenticationToken(validParameters);

        Optional<AuthenticatedUser> parsingResult = tokenParser.parse(cuiAuthenticationToken, validParameters.getJwtParseSignature());

        assertThat((Object) parsingResult.get()).isEqualToComparingFieldByField(new AuthenticatedUser(validParameters.getId(), validParameters.getEmail()));
    }

    @ParameterizedTest(name = "{index}. {0} ==> {1}")
    @MethodSource("incorrectData")
    void whenAnyDataIsIncorrect_shouldReturnEmptyAuthenticatedUser(String testExplanation, TokenParserParameters parameters) {
        String cuiAuthenticationToken = createCuiAuthenticationToken(parameters);

        Optional<AuthenticatedUser> parsingResult = tokenParser.parse(cuiAuthenticationToken, parameters.getJwtParseSignature());

        assertThat(parsingResult).isEmpty();
    }

    private static Stream<Arguments> incorrectData() {
        return Stream.of(
                of("Empty id", parameters()
                        .id("").email("valid@email.com").jwtParseSignature("matchingJwtSignature").signatureAlgorithm(HS512).build()),
                of("Empty email", parameters()
                        .id("validId").email("").jwtParseSignature("matchingJwtSignature").signatureAlgorithm(HS512).build()),
                of("Empty jwtParseSignature", parameters()
                        .id("validId").email("valid@email.com").jwtParseSignature("").signatureAlgorithm(HS512).build()),
                of("Null id", parameters()
                        .id(null).email("valid@email.com").jwtParseSignature("matchingJwtSignature").signatureAlgorithm(HS512).build()),
                of("Null email", parameters()
                        .id("validId").email(null).jwtParseSignature("matchingJwtSignature").signatureAlgorithm(HS512).build()),
                of("Null jwtParseSignature", parameters()
                        .id("validId").email("valid@email.com").jwtParseSignature(null).signatureAlgorithm(HS512).build()),
                of("NONE signature algorithm", parameters()
                        .id("validId").email("valid@email.com").jwtParseSignature("matchingJwtSignature").signatureAlgorithm(NONE).build()),
                of("Wrong signature algorithm", parameters()
                        .id("validId").email("valid@email.com").jwtParseSignature("matchingJwtSignature").signatureAlgorithm(HS256).build()),
                of("Mismatching jwtParseSignature", parameters()
                        .id("validId").email("valid@email.com").jwtParseSignature("mismatchingJwtSignature").signatureAlgorithm(HS512).build())
        );
    }

    private String createCuiAuthenticationToken(TokenParserParameters parameters) {
        JwtBuilder jwtBuilder = Jwts.builder()
                .setSubject(parameters.getId())
                .claim("email", parameters.getEmail());

        if (!NONE.equals(parameters.getSignatureAlgorithm()))
            jwtBuilder.signWith(parameters.getSignatureAlgorithm(), "matchingJwtSignature");

        return jwtBuilder.compact();
    }
}