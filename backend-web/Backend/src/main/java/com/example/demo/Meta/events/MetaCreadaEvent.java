package com.example.demo.Meta.events;

import com.example.demo.Meta.domain.Meta;
import org.springframework.context.ApplicationEvent;

public class MetaCreadaEvent extends ApplicationEvent {
    private final Meta meta;

    public MetaCreadaEvent(Object source, Meta meta) {
        super(source);
        this.meta = meta;
    }

    public Meta getMeta() {
        return meta;
    }
}
