# CalendApp

## Table of Contents
* [Technologies Used] (https://github.com/hatchways/team-matcha#technologies)
* [Overview] (https://github.com/hatchways/team-matcha#overview)
* [Running Locally] (https://github.com/hatchways/team-matcha#to-run)

## Technologies

* Python (*Flask*), Javascript (*ReactJs*), Postgres (*SqlAlchemy*), CSS (*Materials-UI*)

## Overview

### Summary

### Onboarding

#### Features
* Login with Google Oauth
* Set user unique url suffix and timezone
* Set first event's availability (time and days)

![login](documentation/login.png)

![login](documentation/onboarding.gif)
*onboarding flow*

### Events

#### Features
* Create, Read, Update, Delete Event
* Specify
  * Name, location or phone number, description, unique event link suffix, duration, timezone, available days, and color
* Each event has a unique sharable link to provide invitees access to a calendar of available time slots

![event-create](documentation/event-create.gif)
*event creation flow*


### Calendar
#### Features

* Calendar provides available timeslots for booking a meeting time
* Timeslots take into account:
  * Google Calendar Events
  * Aplication's database of appointments
  * Event's availability settings
* Timezone picker with corresponding timeslot times
* Optional Comment on the booking by invitee
![event-create](documentation/calendar.gif)
*calendar flow*

### Appointments



### Email Confirmation
#### Features
* User receives email confirmation on successful appointment booking
* Email displays
  * Event Details (name, description, location, etc)
  * Appoint Details (date and time)
  * Event has link that redirects to application

![email-confirmation](documentation/email-confirmation.jpg)

## To-Run

### Prerequisite

Docker installed. See [here]('https://www.docker.com/products/docker-desktop')

### Docker

#### Some Useful Commands

#### To build and Run:
```
make docker-build
make docker-up
```
#### To run tests
###### container should be up before testing
```
make docker-test
```

#### To Create Table:
```
make docker-recreate-db
```

#### To enter postgres terminal:
###### docker exec [service name] psql --username=[postgres username] --dbname=[database name]

```
docker-compose exec postgres-db psql --username=postgres --dbname=db_dev
```

