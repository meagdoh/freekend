"use strict";

(function() {
    let eventUrl = ""
    let zip = 0
    let eventsList = ""
    let singleEvent = ""

    angular
        .module("freekend", [
            "ui.router",
            "ngResource",
            'ngSanitize'
        ])
        .controller("FreekendController", [
            FreekendControllerFunction
        ])
        .config([
            "$stateProvider",
            RouterFunction
        ])
        .factory("LocationFactory", [
            "$resource",
            LocationFactoryFunction
        ])
        .factory("EventFactory", [
            "$resource",
            EventFactoryFunction
        ])
        .factory("CommentFactory", [
          "$resource",
          CommentFactoryFunction
        ])
        .controller("FreekendIndexController", [
            "LocationFactory",
            "EventFactory",
            FreekendIndexControllerFunction
        ])
        .controller("FreekendShowController", [
            "$stateParams",
            "LocationFactory",
            "EventFactory",
            "CommentFactory",
            FreekendShowControllerFunction
        ])

    function RouterFunction($stateProvider) {
        $stateProvider
            .state("eventsIndex", {
                url: "/",
                templateUrl: "js/ng-views/index.html",
                controller: "FreekendIndexController",
                controllerAs: "vm"
            })
            .state("eventShow", {
                url: "/event/:id",
                templateUrl: "js/ng-views/show.html",
                controller: "FreekendShowController",
                controllerAs: "vm"
            })
    }

    function FreekendControllerFunction() {
    }

    function FreekendIndexControllerFunction(LocationFactory, EventFactory) {
        let self = this
        this.events
        this.event_description
        LocationFactory.get().$promise.then(function(response) {
            self.zip = response.zip
            console.log(self.zip)
            EventFactory.get({
                zip: response.zip
            }).$promise.then(function(data) {
                self.events = data.events.event
                eventsList = data.events.event
            })
        })

        this.setSingleEvent = function(place) {
            singleEvent = place
            console.log(singleEvent)
            console.log("click")
        }
    }

    function FreekendShowControllerFunction($stateParams, LocationFactory, EventFactory, CommentFactory) {
       let self = this
       this.eventId = $stateParams.id
       if (eventsList === !undefined) {
       	self.events = eventList
       	console.log(this.eventId)
       }


       if(this.events === undefined) {
            LocationFactory.get().$promise.then(function(response) {
                EventFactory.get({zip: response.zip}).$promise.then(function(data) {
                    self.events = data.events.event
                    eventsList = data.events.event
                    console.log(self.events)
                    CommentFactory.query().$promise.then(function(data2){
                      console.log(data2)
                    })
                })
            })
       } else {
       		self.events = eventsList
       }
    }

    function LocationFactoryFunction($resource) {
        return $resource("http://ip-api.com/json")
    }

    function EventFactoryFunction($resource) {
        return $resource("http://api.eventful.com/json/events/search?!sort=rec&location=:zip&date=Today&app_key=N6hhj9BZcLjg2KmX")
    }

    function CommentFactoryFunction ($resource) {
        return $resource("http://localhost:3000/comments")
    }

})();
