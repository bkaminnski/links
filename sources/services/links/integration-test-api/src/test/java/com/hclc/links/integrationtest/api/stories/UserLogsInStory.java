package com.hclc.links.integrationtest.api.stories;

import com.hclc.links.integrationtest.api.features.login.LoginFeature;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.assertj.core.api.Assertions;

import javax.ws.rs.client.WebTarget;

public class UserLogsInStory {

    private static final String SIGNING_KEY_NEVER_EXPOSED_TO_CLIENTS_HERE_ONLY_FOR_ASSERTION_PURPOSE = "test_signature";
    private static final String EMAIL = "someone@email.com";
    private static final String ANOTHER_EMAIL = "another.someone@email.com";
    private static final String YET_ANOTHER_EMAIL = "yet.another.someone@email.com";
    private final WebTarget target;
    private String jwtToken;

    public UserLogsInStory(WebTarget target) {
        this.target = target;
    }

    public String userLogsIntoTheSystem() {
        jwtToken = new LoginFeature(target).logUserIn(EMAIL, "admin");
        return jwtToken;
    }

    public String anotherUserLogsIntoTheSystem() {
        jwtToken = new LoginFeature(target).logUserIn(ANOTHER_EMAIL, "admin");
        return jwtToken;
    }

    public String yetAnotherUserLogsIntoTheSystem() {
        jwtToken = new LoginFeature(target).logUserIn(YET_ANOTHER_EMAIL, "admin");
        return jwtToken;
    }

    public void assertUserSuccessfullyLoggedIn() {
        Jws<Claims> claims = Jwts.parser()
                .setSigningKey(SIGNING_KEY_NEVER_EXPOSED_TO_CLIENTS_HERE_ONLY_FOR_ASSERTION_PURPOSE)
                .parseClaimsJws(jwtToken);
        String actualEmail = (String) claims.getBody().get("email");
        Assertions.assertThat(actualEmail).isEqualTo(EMAIL);
    }
}
