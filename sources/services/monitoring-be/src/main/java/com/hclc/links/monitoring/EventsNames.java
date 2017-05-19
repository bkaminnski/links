package com.hclc.links.monitoring;

import com.hclc.libs.events.EventName;

public class EventsNames {

    public final static EventName myServiceIsAvailable = new EventName("myServiceIsAvailable");
    public final static EventName myServiceIsUnavailable = new EventName("myServiceIsUnavailable");
    public final static EventName uiEvent = new EventName("uiEvent");
}
