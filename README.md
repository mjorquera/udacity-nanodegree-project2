# Project 2: Public Transportation App

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## 1. Instalation

### Download Project

Download .zip file or clone this project.
[https://github.com/mjorquera/udacity-nanodegree-project2.git](https://github.com/mjorquera/udacity-nanodegree-project2.git)

### Restore bower packages
```
$ bower install
```

## Run on develop

Run `grunt` for building and `grunt serve` for preview.

## Run on production

Run `grunt serve:dist`

### Browse to the Project
Open a web browser and go to [http://localhost:9000](http://localhost:9000)

## 2. Usage

### Select only Departure
The application is builded in way that only selecting the departure station it shows the next
trains to departure in that station. (This is because the API used gives that funcionality)

### Select Departure and Arrival
First select a departure station, and then a destination, the will show the trains that make that route.
If there is no train it will show up a message.

### Testing Offline First

1. Charge a page and test a functionality in order to populate the de DB
2. Disconnect the internet or do it on DevTools > Application > Service Workers > Offline
3. Select a Departure Station (Offline funcionality works only selecting the departure station)

## 3. Extras

* Map by Leaflet & OpenStreetMap: http://tombatossals.github.io/angular-leaflet-directive/#!/
* Angular Font Awesome: https://github.com/picardy/angular-fontawesome
* UK Train API: http://www.transportapi.com/