"use strict";

(function() {
    let eventUrl = ""
    let zip = 0
    let eventsList = ""
    let singleEvent = ""

    angular
        .module("freekend", [
            "ui.router",
            "ngResource"
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
        .controller("FreekendIndexController", [
            "LocationFactory",
            "EventFactory",
            FreekendIndexControllerFunction
        ])
        .controller("FreekendShowController", [
            "$stateParams",
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



    function FreekendShowControllerFunction($stateParams) {
       this.events = eventsList
       this.eventId = $stateParams.id
       console.log(this.eventId)
    }

    function LocationFactoryFunction($resource) {
        return $resource("http://ip-api.com/json")
    }

    function EventFactoryFunction($resource) {
        return $resource("http://api.eventful.com/json/events/search?location=:zip&date=Today&app_key=N6hhj9BZcLjg2KmX")
    }

})();