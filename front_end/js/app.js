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
        .factory("CityFactory", [
          "$resource",
          CityFactoryFunction
        ])
        .controller("FreekendIndexController", [
            "LocationFactory",
            "EventFactory",
            FreekendIndexControllerFunction
        ])
        .controller("FreekendCommentNewController",[
          "$stateParams",
          "CommentFactory",
          "$state",
          FreekendCommentNewControllerFunction
        ])
        .controller("FreekendCommentEditController",[
          "$stateParams",
          "CommentFactory",
          "$state",
          FreekendCommentEditControllerFunction
        ])
        .controller("FreekendShowController", [
            "$stateParams",
            "LocationFactory",
            "EventFactory",
            "CommentFactory",
            FreekendShowControllerFunction
        ])
        .controller("FreekendCityIndexController", [
            "$stateParams",
            FreekendCityIndexControllerFunction
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
            .state("commentEdit", {
              url: "/event/:id/comments/:comment_id",
              templateUrl:  "js/ng-views/comments/edit.html",
              controller: "FreekendCommentEditController",
              controllerAs: "vm"
            })

            .state("cityShow", {
              url: "/city/:city_name",
              templateUrl:  "js/ng-views/city/index.html",
              controller: "FreekendCityIndexController",
              controllerAs: "vm"
            })
    }

    function FreekendControllerFunction() {
    }

    function FreekendCityIndexControllerFunction($stateParams, CityFactory) {
      // TODO: ui-sref/stateParams does not update immediately. 
      this.getCityInfo = function() {
        console.log($stateParams.city_name)
        // CityFactory.get({
        //   name: $stateParams.city_name
        // }).$promise.then(function(data) {
        //   console.log(data)
        // })
      }
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
      this.comment 

      // this.favorite = null

      // this.createFavorite = function(){
      //   console.log("shit")
      //   // self.favorite = new FavoriteFactory()
      //   self.favorite.event_id = self.eventId
      //   self.favorite.$save()
      // }

      // this.deleteFavorite(){

      // }

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

    function FreekendCommentNewControllerFunction($stateParams, CommentFactory, $state){
      let self = this
      this.comment = new CommentFactory()
      this.eventId = $stateParams.id
      this.comment.event_id = $stateParams.id
      this.create = function (){
        this.comment.$save()
        $state.go('eventShow', {id: self.eventId})
      }
    }

    function FreekendCommentEditControllerFunction($stateParams, CommentFactory, $state){
      let self = this
      this.comment = CommentFactory.get({id: $stateParams.comment_id})
      this.eventId = $stateParams.id
      this.update = function(){
        console.log()
        this.comment.$update({id: this.comment.id}, function(){
          $state.go('eventShow', {id: self.eventId}).success
        })
      }
      this.destroy = function(){
        this.comment.$delete({id: this.comment.id})
        $state.go('eventShow', {id: self.eventId})
      }
    }


    function LocationFactoryFunction($resource) {
        return $resource("http://ip-api.com/json")
    }

    function EventFactoryFunction($resource) {
        return $resource("http://api.eventful.com/json/events/search?!sort=rec&location=:zip&date=Today&app_key=N6hhj9BZcLjg2KmX")
    }

    function CommentFactoryFunction ($resource) {
        return $resource("http://localhost:3000/comments/:id", {}, {
          update: { method: "PUT"}
        });
    }

    function FavoriteFactoryFunction ($resource) {
        return $resource("http://localhost:3000/favorites/:id")
    }
    function CityDatabaseFactoryFunction($resource) {
      return $resource("http://localhost:3000/favorites/:id")
    }

    function CityFactoryFunction ($resource) {
      return $resource("http://api.eventful.com/json/events/search?!sort=rec&city_name=:city_name&date=Today&app_key=N6hhj9BZcLjg2KmX")
    }



})();
