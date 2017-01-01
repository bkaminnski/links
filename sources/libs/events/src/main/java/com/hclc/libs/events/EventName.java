package com.hclc.libs.events;

import java.util.Objects;

public class EventName {

    private final String eventName;

    public EventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventName() {
        return eventName;
    }

    @Override
    public String toString() {
        return eventName;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 59 * hash + Objects.hashCode(this.eventName);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final EventName other = (EventName) obj;
        if (!Objects.equals(this.eventName, other.eventName)) {
            return false;
        }
        return true;
    }
}
