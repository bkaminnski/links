package com.hclc.libs.authentication.control;

import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder(builderMethodName = "customBuilderMethodNameInaccessibleInStaticImportWithJDK1_8_141AndLombok1_6_18")
@ToString
class TokenParserParameters {
    private String id, email, jwtParseSignature;
    private SignatureAlgorithm signatureAlgorithm;

    static TokenParserParametersBuilder parameters() {
        return TokenParserParameters.customBuilderMethodNameInaccessibleInStaticImportWithJDK1_8_141AndLombok1_6_18();
    }
}
