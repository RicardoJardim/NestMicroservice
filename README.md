# MicroService architecture example using Nest.js

## Direct client-to-microservice communication
Each microservice has a public endpoint, with a different TCP port for each microservice. A direct client-to-microservice communication architecture could be good enough for a small microservice-based application.

Advantages
  - Simple to develop, therefore the final solution is less complex
  - Fast processing and shorter response times  
Disadvantages
  -  The client apps are coupled to the internal microservices.
  -  A single page/screen in the client app might require several calls to multiple services.
  -  Every microservice needs to be concerned with security issues

![alt text](https://github.com/RicardoJardim/NestMicroservice/blob/main/nest.png "Diagram")


## API Gateway pattern 
Apps connect to a single endpoint, the API Gateway, that's configured to make requests to individual microservices or multiple microservices by asynchronous message-based communication. Therefore, the API gateway sits between the client apps and the microservices. It can act as a reverse proxy, making requests from clients to services, and it can also provide other cross-cutting features such as authentication, SSL termination, and cache.

Advantages
  - Insulates the clients from how the application is partitioned into microservices
  - Insulates the clients from the problem of determining the locations of service instances
  - Provides the optimal API for each client
  - IP allowlisting
  - Authentication and authorization
Disadvantages
  - Single point of failure
  - 
  
![alt text](https://github.com/RicardoJardim/NestMicroservice/blob/main/nest2.png "Diagram2")


