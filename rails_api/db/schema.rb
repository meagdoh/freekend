# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170512204444) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name_cat"
  end

  create_table "cities", force: :cascade do |t|
    t.string "name"
    t.integer "zip"
    t.string "query_name"
  end

  create_table "comments", force: :cascade do |t|
    t.string "author"
    t.string "content"
    t.string "event_id"
  end

  create_table "events", force: :cascade do |t|
    t.bigint "comment_id_id"
    t.bigint "favorite_id_id"
    t.index ["comment_id_id"], name: "index_events_on_comment_id_id"
    t.index ["favorite_id_id"], name: "index_events_on_favorite_id_id"
  end

  create_table "favorites", force: :cascade do |t|
    t.string "event_id"
  end

end
