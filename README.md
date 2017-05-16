# Freekend
## A dynamic event guide developed using Rails and AngularJS

Freekend is the #1 events app on the web! With Freekend, users are able to receive a list of available events within the
user’s geolocation. The user’s location (zip code) is determined automatically by the user’s IP address.

### Schema

* Cities
  * "name"
  * "zip"
  * "long"
  * "lat"

* Comments
  * "author"
  * "content"
  * "event_id"

* Events
  * "comment_id_id"
  * "index_events_on_favorite_id_id"
  * "favorite_id_id"
  * "index_events_on_comment_id_id"

The user should be able to:
  * Have their IP address automatically retrieve events within or nearby their zip code.
  * Comment and Favorite on the nearby events for the user's personal reference

Freekend uses Eventful API to gather event data on current opportunities, focusing on immediate opportunities users can go out to an event within their immediate location.

Freekend uses a customized card-based UI made with Bulma CSS.
