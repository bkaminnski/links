package com.hclc;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;

@MessageDriven(activationConfig = {
    @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic")
    , 
    @ActivationConfigProperty(propertyName = "destination", propertyValue = "topic/test")})

public class TestTopicProsumer implements MessageListener {


    @Override
    public void onMessage(Message message) {
        try {
            String payload = message.getBody(String.class);
            Logger.getLogger(TestTopicProsumer.class.getName()).log(Level.INFO, "###################################### Message received: " + payload);
        } catch (JMSException ex) {
            Logger.getLogger(TestTopicProsumer.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
