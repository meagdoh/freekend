# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

  city1 = City.create([{ name: 'Beverley Hills' }, { zip: '90210' }, { long: '0' },{ lat: '0' }])
  category1 = Category.create([{ name_cat: 'Concert' }])
  comment1 = Comment.create([{author: 'Stormy', content: 'This concert is going to be ah-maze-ing' , event_id: 1}])
