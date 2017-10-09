[1mdiff --git a/sources/services/links-ui/src/LinksClient.js b/sources/services/links-ui/src/LinksClient.js[m
[1mindex bf95b28..e843e55 100644[m
[1m--- a/sources/services/links-ui/src/LinksClient.js[m
[1m+++ b/sources/services/links-ui/src/LinksClient.js[m
[36m@@ -23,9 +23,14 @@[m [mexport default class LinksClient {[m
         let result = new Promise((resolve, reject) => {[m
             let request = new XMLHttpRequest();[m
             request.open("GET", services.get('links') + '/resources/links');[m
[32m+[m[32m            request.withCredentials = true;[m
             request.onreadystatechange = function () {[m
[31m-                if (request.readyState == 4 && request.status == 200) {[m
[31m-                    resolve(JSON.parse(request.responseText));[m
[32m+[m[32m                if (request.readyState == 4) {[m
[32m+[m[32m                    if (request.status == 200) {[m
[32m+[m[32m                        resolve(JSON.parse(request.responseText));[m
[32m+[m[32m                    } else if (request.status == 401) {[m
[32m+[m[32m                        PubSub.publish('uiEvent.authentication.requested');[m
[32m+[m[32m                    }[m
                 }[m
             }[m
             request.send();[m
[1mdiff --git a/sources/services/menu-and-content-ui/src/app.js b/sources/services/menu-and-content-ui/src/app.js[m
[1mindex b739f91..9ec0af8 100644[m
[1m--- a/sources/services/menu-and-content-ui/src/app.js[m
[1m+++ b/sources/services/menu-and-content-ui/src/app.js[m
[36m@@ -1,4 +1,5 @@[m
 import ApplicationLayoutEvents from './events/ApplicationLayoutEvents.jsx';[m
 [m
 let applicationLayoutEvents = new ApplicationLayoutEvents();[m
[32m+[m[32mapplicationLayoutEvents.subscribeToRequested();[m
 applicationLayoutEvents.publishAvailable();[m
\ No newline at end of file[m
[1mdiff --git a/sources/services/menu-and-content-ui/src/events/ApplicationLayoutEvents.jsx b/sources/services/menu-and-content-ui/src/events/ApplicationLayoutEvents.jsx[m
[1mindex a8a99ca..3ba1ffb 100644[m
[1m--- a/sources/services/menu-and-content-ui/src/events/ApplicationLayoutEvents.jsx[m
[1m+++ b/sources/services/menu-and-content-ui/src/events/ApplicationLayoutEvents.jsx[m
[36m@@ -2,7 +2,13 @@[m [mimport MenuAndContent from '../page/MenuAndContent.jsx';[m
 [m
 export default class ApplicationLayoutEvents {[m
 [m
[32m+[m[32m    subscribeToRequested() {[m
[32m+[m[32m        this.applicationLayoutRequestedSubscriptionToken = PubSub.subscribe('uiEvent.applicationLayout.requested', msg => {[m
[32m+[m[32m            this.publishAvailable();[m
[32m+[m[32m        });[m
[32m+[m[32m    }[m
[32m+[m
     publishAvailable() {[m
[31m-        PubSub.publish('uiEvent.applicationLayout.available', <MenuAndContent />)[m
[32m+[m[32m        PubSub.publish('uiEvent.applicationLayout.available', <MenuAndContent />);[m
     }[m
 }[m
\ No newline at end of file[m
[1mdiff --git a/sources/services/users-be/src/main/java/com/hclc/links/users/sessions/boundary/Sessions.java b/sources/services/users-be/src/main/java/com/hclc/links/users/sessions/boundary/Sessions.java[m
[1mindex 593145a..6e386b1 100644[m
[1m--- a/sources/services/users-be/src/main/java/com/hclc/links/users/sessions/boundary/Sessions.java[m
[1m+++ b/sources/services/users-be/src/main/java/com/hclc/links/users/sessions/boundary/Sessions.java[m
[36m@@ -7,6 +7,7 @@[m [mimport javax.ws.rs.Consumes;[m
 import javax.ws.rs.POST;[m
 import javax.ws.rs.Path;[m
 import javax.ws.rs.Produces;[m
[32m+[m[32mimport javax.ws.rs.core.NewCookie;[m
 import javax.ws.rs.core.Response;[m
 [m
 import static javax.ws.rs.core.MediaType.APPLICATION_JSON;[m
[36m@@ -19,8 +20,12 @@[m [mpublic class Sessions {[m
     @Consumes(APPLICATION_JSON)[m
     @Produces(APPLICATION_JSON)[m
     public Response create(NewSessionRequest newSessionRequest) {[m
[32m+[m[32m//        NewCookie sessionCookie = new NewCookie("cuiSessionId", "validId", "", "", NewCookie.DEFAULT_VERSION, "", NewCookie.DEFAULT_MAX_AGE, null, false, true);[m
[32m+[m[32m        NewCookie sessionCookie = new NewCookie("cuiSessionId", "validId", "/", "localhost", NewCookie.DEFAULT_VERSION, "", NewCookie.DEFAULT_MAX_AGE, null, false, true);[m
         if ("admin".equals(newSessionRequest.getPassword()) && "admin".equals(newSessionRequest.getPassword()))[m
[31m-            return Response.noContent().header("Set-Cookie", "cuiSessionId=validId;HttpOnly").build();[m
[32m+[m[32m            return Response.noContent().cookie(sessionCookie).build();[m
[32m+[m[32m//            return Response.noContent().header("Set-Cookie", "cuiSessionId=validId").build();[m
[32m+[m[32m//            return Response.noContent().header("Set-Cookie", "cuiSessionId=validId;HttpOnly").build();[m
 [m
         return Response.status(Response.Status.UNAUTHORIZED).build();[m
     }[m
[1mdiff --git a/sources/services/users-ui/src/UsersClient.js b/sources/services/users-ui/src/UsersClient.js[m
[1mindex 51efbde..e149a69 100644[m
[1m--- a/sources/services/users-ui/src/UsersClient.js[m
[1m+++ b/sources/services/users-ui/src/UsersClient.js[m
[36m@@ -6,9 +6,10 @@[m [mexport default class UsersClient {[m
             request.open("POST", services.get('users') + '/resources/sessions');[m
             request.setRequestHeader("Content-type", "application/json");[m
             request.setRequestHeader("Accept", "*/*");[m
[32m+[m[32m            request.withCredentials = true;[m
             request.onreadystatechange = function () {[m
                 if (request.readyState == 4 && (request.status == 204 || request.status == 401)) {[m
[31m-                    resolve(request.status);[m
[32m+[m[32m                    resolve(request);[m
                 }[m
             }[m
             request.send(JSON.stringify({[m
[1mdiff --git a/sources/services/users-ui/src/login/LoginFormStore.js b/sources/services/users-ui/src/login/LoginFormStore.js[m
[1mindex 1029895..1aa7208 100644[m
[1m--- a/sources/services/users-ui/src/login/LoginFormStore.js[m
[1m+++ b/sources/services/users-ui/src/login/LoginFormStore.js[m
[36m@@ -28,8 +28,15 @@[m [mexport default class LoginFormStore {[m
     login() {[m
         this.usersClient[m
             .login(this.formComponent.state.attributes.username.value, this.formComponent.state.attributes.password.value)[m
[31m-            .then(status => console.log(status))[m
[31m-            .then(() => console.log(document.cookie));[m
[32m+[m[32m            .then(response => this.handleLoginResponse(response));[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    handleLoginResponse(response) {[m
[32m+[m[32m        if (response.status == 204) {[m
[32m+[m[32m            PubSub.publish('uiEvent.applicationLayout.requested');[m
[32m+[m[32m        } else {[m
[32m+[m[32m            PubSub.publish('uiEvent.authentication.requested');[m
[32m+[m[32m        }[m
     }[m
 [m
     onChange(attributeName, attributeValue, attributeValid) {[m
