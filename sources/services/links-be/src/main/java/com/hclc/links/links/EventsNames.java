package com.hclc.links.links;

import com.hclc.libs.events.EventName;

public class EventsNames {

    public final static EventName wakeUp = new EventName("wakeUp");
    public final static EventName giveMeLinksSlices = new EventName("giveMeLinksSlices");
    public final static EventName myLinksSliceIsAvailable = new EventName("myLinksSliceIsAvailable");
    public final static EventName myLinksSliceIsUnavailable = new EventName("myLinksSliceIsUnavailable");
}