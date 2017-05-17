# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

City.destroy_all
Category.destroy_all
Comment.destroy_all
Favorite.destroy_all

city1 = City.create([{ name: 'Beverley Hills',  zip: '90210'}])
city2 = City.create([{ name: 'Boston', query_name: "boston"}])
city3 = City.create([{ name: 'Chicago', query_name: "chicago"}])
city4 = City.create([{ name: 'Washington', query_name: "washington" }])
category1 = Category.create([{ name_cat: 'Concert' }])
comment1 = Comment.create([{author: 'Stormy', content: 'This concert is going to be ah-maze-ing' , event_id: "1"}])
comment2 = Comment.create([{author: 'Jon', content: 'This concert is going to be horrible' , event_id: "1"}])
comment3 = Comment.create([{author: 'Omar', content: 'This concert is going to be meh' , event_id: "2"}])
favorite1 = Favorite.create([{event_id: "234234234"}])
favorite2 = Favorite.create([{event_id: "11111111"}])