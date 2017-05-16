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
        // .factory("FavoriteFactory", [
        //     "$resources",
        //     FavoriteFactoryFunction
        // ])
        .controller("FreekendIndexController", [
            "LocationFactory",
            "EventFactory",
            FreekendIndexControllerFunction
        ])
        .controller("FreekendCommentNewController",[
          "$stateParams",
          "CommentFactory",
          FreekendCommentNewControllerFunction
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
            .state("commentNew", {
              url: "/event/:id/comment/new",
              templateUrl:  "js/ng-views/comments/new.html",
              controller: "FreekendCommentNewController",
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


        LocationFactory.get().$promise.then(function(response) {
            EventFactory.get({zip: response.zip}).$promise.then(function(data) {
                self.events = data.events.event
                eventsList = data.events.event
                CommentFactory.query().$promise.then(function(data2){
                   self.comments = data2
                })
            })
        })
    }

    function FreekendCommentNewControllerFunction($stateParams, CommentFactory){
      this.comment = new CommentFactory()
      this.comment.event_id = $stateParams.id
      this.create = function (){
        this.comment.$save()
      }
    }


    function LocationFactoryFunction($resource) {
        return $resource("http://ip-api.com/json")
    }

    function EventFactoryFunction($resource) {
        return $resource("http://api.eventful.com/json/events/search?!sort=rec&location=:zip&date=Today&app_key=N6hhj9BZcLjg2KmX")
    }

    function CommentFactoryFunction ($resource) {
        return $resource("http://localhost:3000/comments/:id")
    }

    // function FavoriteFactoryFunction ($resource) {
    //     return $resource("http://localhost:3000/favorites/:id")
    // }



})();
