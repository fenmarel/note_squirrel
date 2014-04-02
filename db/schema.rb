# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20140402152726) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "dashboards", force: true do |t|
    t.string   "title",      null: false
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "dashboards", ["user_id", "title"], name: "index_dashboards_on_user_id_and_title", unique: true, using: :btree
  add_index "dashboards", ["user_id"], name: "index_dashboards_on_user_id", using: :btree

  create_table "notebooks", force: true do |t|
    t.string   "title",                        null: false
    t.integer  "dashboard_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "favorite",     default: false
    t.boolean  "trashcan",     default: false
  end

  add_index "notebooks", ["dashboard_id", "title"], name: "index_notebooks_on_dashboard_id_and_title", unique: true, using: :btree
  add_index "notebooks", ["dashboard_id"], name: "index_notebooks_on_dashboard_id", using: :btree
  add_index "notebooks", ["favorite"], name: "index_notebooks_on_favorite", using: :btree
  add_index "notebooks", ["trashcan"], name: "index_notebooks_on_trashcan", using: :btree

  create_table "notes", force: true do |t|
    t.string   "title",       default: "Untitled", null: false
    t.text     "body"
    t.integer  "notebook_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "notes", ["notebook_id"], name: "index_notes_on_notebook_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
