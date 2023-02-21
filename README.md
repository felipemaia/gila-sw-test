# gila-sw-test

Create an app (front and back) for different types of notifications and different channels. Must be scalable.

# HOW TO RUN THE APP

1. Run the command (on the root folder): > docker-compose up
   It might take a while to build the images.
   Now open the link on the browser: localhost:3000

# UNDERSTANDING THE USERS (for testing the app)

USER 1: subscribed to all 3 categories; on all 3 channels. Should always receive 3 notifications (one for each channel)
USER 2: subscribed to all 3 categories; only one channel (SMS)
USER 3: subscribed to one category (Finance) and all 3 channels
USER 4: subscribed to 2 categories (Sports and Movies) but no channel. Should never receive a message.
USER 5: Subscribed to 2 channels (E-Mail and Push Notification) but no categories. Should never receive a message.

# DESCRIPTION

The system was created using RESTful APIs on a monorepo containing microservices. This approach allows multiple teams to focus on different services at the same time without compromising the final result.

The database chosen was mongodb, but with the use of DTOs on the construction of the microservices, it's possible to easily swap the database (another mongo db or even other type of database)
