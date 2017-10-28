package com.hclc.libs.authentication.control.fixtures;

import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder(builderMethodName = "customBuilderMethodNameInaccessibleInStaticImportWithJDK1_8_141AndLombok1_6_18")
@ToString
public class TokenParserParameters {
    private String id, email, jwtParseSignature;
    private SignatureAlgorithm signatureAlgorithm;

    public static TokenParserParametersBuilder parameters() {
        return TokenParserParameters.customBuilderMethodNameInaccessibleInStaticImportWithJDK1_8_141AndLombok1_6_18();
    }
}
