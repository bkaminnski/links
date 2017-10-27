package com.hclc.libs.authentication.control;

public class ArtificialPause {

    public void pauseFor200milliseconds() {
        try {
            Thread.sleep(200);
        } catch (InterruptedException e) {
            // ignore
        }
    }
}
