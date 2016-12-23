package com.hclc;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;

@MessageDriven(activationConfig = {
    @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic"), 
    @ActivationConfigProperty(propertyName = "destination", propertyValue = "topic/links")})

public class LinksTopicConsumer implements MessageListener {

    @PostConstruct
    public void method() {
        Logger.getLogger(LinksTopicConsumer.class.getName()).log(Level.INFO, "***************** LinksTopicConsumer IN DESCRPTION was created ");
    }
    

    @Override
    public void onMessage(Message message) {
        try {
            String payload = message.getBody(String.class);
            Logger.getLogger(LinksTopicConsumer.class.getName()).log(Level.INFO, "###################################### Message received IN DESCRPTION: " + payload);
        } catch (JMSException ex) {
            Logger.getLogger(LinksTopicConsumer.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
