package com.hclc.links.application;

import com.hclc.libs.events.EventName;

public class EventsNames {

    public final static EventName wakeUp = new EventName("wakeUp");
    public final static EventName giveMeServices = new EventName("giveMeServices");
    public final static EventName myServiceIsAvailable = new EventName("myServiceIsAvailable");
    public final static EventName myServiceIsUnavailable = new EventName("myServiceIsUnavailable");
}
