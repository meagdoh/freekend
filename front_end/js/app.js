"use strict";

(function(){

	let events = [{
		name: "Party at my Place",
		time: "7:30pm",
		city: "Washington",
		state: "DC",
		zip_code: 20006,
		address: "2343 Connecticut Street",
		photo_url: "http://i.imgur.com/TbjJwFj.jpg"
	}, {
		name: "Tycho Show",
		time: "9:30pm",
		city: "Washington",
		state: "DC",
		zip_code: 20006,
		address: "6364 West Street",
		photo_url: "http://i.imgur.com/MkLTfuc.jpg"
	}]

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
	.controller("FreekendIndexController", [
		"LocationFactory",
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


	function FreekendIndexControllerFunction( LocationFactory ) {
		this.location = LocationFactory.get()
		console.log(this.location)
	}

	function FreekendShowControllerFunction() {
		this.event_single = events[0]
	}

	function LocationFactoryFunction( $resource ){
    return $resource( "http://ip-api.com/json" )
  }

})();