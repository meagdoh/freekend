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
	.controller("freekendController", [
		FreekendControllerFunction
	])

	function FreekendControllerFunction() {
		this.event_list = events
	}

})();