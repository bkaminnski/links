# Links - Composite UI project

This is a JEE version of [this project](https://github.com/bkaminnski/links-spring/).

## Goal

The goal of the project is to verify in practice Composite UI technique. I first heard about it in [*Advanced Distributed Systems Design*](https://particular.net/adsd) course by Udi Dahan (on-line version, available [here](https://www.plimus.com/jsp/buynow.jsp?contractId=2317281)). You can find a short introduction to this idea in his [blog post](http://udidahan.com/2012/06/23/ui-composition-techniques-for-correct-service-boundaries/). Another mention of the technique can be found in [*Building Microservices* book](https://www.amazon.co.uk/d/Books/Building-Microservices-Sam-Newman/1491950358) by Sam Newman, under the name *UI Fragment Composition* (however with far less attention). It was also mentioned in the Technology Radar under the term of *micro frontends*, [here](https://www.thoughtworks.com/radar/techniques/micro-frontends).

Even though Composite UI technique makes the main driver for the project, there are many other interleaving concepts, playing with which is important alike: finding services boundaries, autonomous services, services decomposition, messaging, asynchronous communication, loose coupling. The goal of the hands-on part of the project is to practice automation skills (with tools Docker and some scripting), JEE (with JMS, JPA, CDI, ...), Java 8 (with its streams, lambdas, ...) and ReactJS (with webpack, babel, ...). 

And the overall theme of the project derives from the [KISS](https://en.wikipedia.org/wiki/KISS_principle) principle.

## Links

This is my personal project, therefore I decided to make a simple application in terms of its functional scope. It is a list of links - idea similar to the [pocket](http://getpocket.com/) application (BTW - highly recommended). Even though it is small, it still gives enough opportunities to evaluate many interesting concepts.

## Project status and roadmap

### Done

- Initial ReactJS scouting. I made a [separate github repository](https://github.com/bkaminnski/react) to give ReactJS a try. In particular [this](https://github.com/bkaminnski/react/tree/master/05-introducing-composite-ui) subproject explains basics of Composite UI technique.
- Continuous integration environment setup, with fully automated provisioning of CentOS 7 machine, middleware (Wildfly) and database (PostgreSQL) initialization, project compilation and deployment. For development purposes the mostly used component of the environment is related to Docker. All sources (plus more detailed explanation in the [README.md](https://github.com/bkaminnski/links-jee/blob/master/ci/README.md)) file are available [here](https://github.com/bkaminnski/links-jee/tree/master/ci).
- First steps with two projects: links (the unifying one), and description (the one to keep descriptions of links). All sources are available [here](https://github.com/bkaminnski/links-jee/tree/master/sources).
- First steps with JMS topic (automated topic creation during Wildfly installation, publishing to the topic, reading from the topic)
- Service discovery based on JMS topic (with hardcoded urls at the moment)
- Extracted the *description* of the `Link` entity to a separate service
- Simple libraries to unify basic operations (service logging, handling of tracking id to track a single request throughout all involved services)
- Extracted the *keywords* of the `Link` entity to a separate service
- Adding a new link from the UI (the first submittable form), provided that the entity is split between three services (URL in *links* service, description in *description* service, keywords in *keywords* service)
- The same project but implemented in Spring Boot technology stack, available [here](https://github.com/bkaminnski/links-spring/)

### Nearest future

- Distributed search of links: a "plug-in" approach or message enrichment on JMS topic; both across all links-related services (urls, keywords, descriptions)
