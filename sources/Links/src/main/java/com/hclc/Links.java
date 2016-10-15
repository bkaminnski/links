package com.hclc;

import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Stateless
@Path(value = "links")
public class Links {
    
    @GET
    public String links() {
        return "http://highcohesionloosecoupling.com";
    }
}
