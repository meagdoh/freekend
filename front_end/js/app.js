"use strict";

(function(){
	let eventUrl = ""
	let zip =0
	let eventsList = ""

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
	.factory( "LocationFactory", [
		"$resource",
    LocationFactoryFunction
  ])
  .factory( "EventFactory", [
		"$resource",
    EventFactoryFunction
  ])
	.controller("FreekendIndexController", [
		"LocationFactory",
		"EventFactory",
		FreekendIndexControllerFunction
	])
	.controller("FreekendShowController", [
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
			url: "/event",
			templateUrl: "js/ng-views/show.html",
			controller: "FreekendShowController",
			controllerAs: "vm"
		})
	}



  function FreekendControllerFunction() {

  }


	function FreekendIndexControllerFunction( LocationFactory, EventFactory ) {
		LocationFactory.get().$promise.then( function( response ) {
			zip = response.zip
			EventFactory.get().$promise.then( function( data ) {
				eventsList = data.events.event
				console.log(eventsList)
			})
		})
	}

	function FreekendShowControllerFunction() {
		this.event_single = events[0]
	}

	function LocationFactoryFunction( $resource ){
		return $resource( "http://ip-api.com/json")
  }

  function EventFactoryFunction( $resource ){
    return $resource( "http://api.eventful.com/json/events/search?location=20009&date=Today&app_key=N6hhj9BZcLjg2KmX" )
  }

})();