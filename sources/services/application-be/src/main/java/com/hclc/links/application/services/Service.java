package com.hclc.links.application.services;

public class Service implements Comparable<Service> {

    private final String name, url;
    private final int priority;

    public Service(String name, String url, Integer priority) {
        this.name = name;
        this.url = url;
        this.priority = (priority == null) ? Integer.MAX_VALUE : priority.intValue();
    }


    @Override
    public int compareTo(Service o) {
        if (this.priority == o.priority) {
            return (int) (10000 * (Math.random() - 0.5));
        }
        return this.priority - o.priority;
    }

    public String getName() {
        return name;
    }

    public String getUrl() {
        return url;
    }
}
