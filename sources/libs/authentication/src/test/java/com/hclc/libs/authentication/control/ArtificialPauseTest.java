package com.hclc.libs.authentication.control;

import org.junit.jupiter.api.Test;

import static java.lang.System.currentTimeMillis;
import static org.assertj.core.api.Assertions.assertThat;

class ArtificialPauseTest {

    @Test
    void shouldPauseFor200Milliseconds() {
        ArtificialPause artificialPause = new ArtificialPause();
        long start = currentTimeMillis();

        artificialPause.pauseFor200milliseconds();

        assertThat(currentTimeMillis() - start).isGreaterThanOrEqualTo(200);
    }
}