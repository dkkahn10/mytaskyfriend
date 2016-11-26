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

ActiveRecord::Schema.define(version: 20161109173122) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chatrooms", force: :cascade do |t|
    t.string   "topic"
    t.string   "slug"
    t.boolean  "public",     default: false, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "messages", force: :cascade do |t|
    t.string   "content"
    t.integer  "user_id"
    t.integer  "chatroom_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["chatroom_id"], name: "index_messages_on_chatroom_id", using: :btree
    t.index ["user_id"], name: "index_messages_on_user_id", using: :btree
  end

  create_table "projects", force: :cascade do |t|
    t.string   "title",                          null: false
    t.boolean  "public",     default: false,     null: false
    t.string   "color",      default: "#00acc1"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.integer  "project_id", null: false
    t.string   "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_tasks_on_project_id", using: :btree
  end

  create_table "userprojects", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "project_id", null: false
    t.integer  "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_userprojects_on_project_id", using: :btree
    t.index ["role_id"], name: "index_userprojects_on_role_id", using: :btree
    t.index ["user_id", "project_id"], name: "index_userprojects_on_user_id_and_project_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_userprojects_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",                                  null: false
    t.string   "email",                  default: "",       null: false
    t.string   "role",                   default: "member", null: false
    t.string   "encrypted_password",     default: "",       null: false
    t.string   "provider"
    t.string   "oauth_uid"
    t.datetime "last_signed_in_at"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,        null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "profile_photo"
    t.string   "facebook_photo"
    t.string   "current_photo"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

  create_table "usertasks", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "task_id",    null: false
    t.integer  "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "index_usertasks_on_role_id", using: :btree
    t.index ["task_id"], name: "index_usertasks_on_task_id", using: :btree
    t.index ["user_id", "task_id"], name: "index_usertasks_on_user_id_and_task_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_usertasks_on_user_id", using: :btree
  end

end
