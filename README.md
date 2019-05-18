**1st year project, INSA CVL | 2019**

# RaspIoT

## Getting Started

* Install [Nodejs](https://nodejs.org/en/)
* Run the command: **npm install** (inside the folder, using the command line tool)
* To start the app: **npm run start**

The server starts and you can access to the web app using the localhost if you use the machine hosting the server, or via another device connected to the same wifi network, using the IP address of the host at port 3000.

## Goals

Successfully light a lamp remotely via a web interface (see diagram below)

![Alt text](IMG-git/conception-finale.png "Conception Finale")

## Specifications:

### Creations:

* Creation of the web interface
* Server creation
* Creation of lamps

### Use:

The user can change the status of a lamp via his web browser
The user can change the state of a lamp via a conventional switch
The system must be efficient, and not turn on the lamp in 10 seconds, but as soon as possible from the user signal
The system must be stable and therefore spit as little as possible
Will be written a specification for the python, arduino and the web server which will detail the creation and operation of each, explaining in particular the code

## Use cases

### Example 1: Using the web interface

The client connects via his web browser to the server. The latter then gives him access to the web interface to take control of the various lamps in the server memory.
Suppose the user chooses to turn off a lamp. He then clicks the button provided for this purpose in the web interface. Data is transmitted to the server and then processed by the server. Once done, it is broadcast to other customers to inform them of the change of state and sent wirelessly to the lamp concerned, which changes state. Simple. On paper.

### Example 2: Using a conventional switch

Suppose now that the user presses the switch of a lamp to turn it on. He presses, the lamp comes on. But data is also transmitted from the lamp to the server. The server processes the data and sends it to each connected client to notify them of the state change.

## Python

## Arduino

