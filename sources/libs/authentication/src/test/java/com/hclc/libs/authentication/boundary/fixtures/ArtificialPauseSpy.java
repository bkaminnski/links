package com.hclc.libs.authentication.boundary.fixtures;

import com.hclc.libs.authentication.control.ArtificialPause;

public class ArtificialPauseSpy extends ArtificialPause {

    private boolean pauseWasExecuted;

    @Override
    public void pauseFor200milliseconds() {
        this.pauseWasExecuted = true;
    }

    public boolean pauseWasExecuted() {
        return pauseWasExecuted;
    }
}
