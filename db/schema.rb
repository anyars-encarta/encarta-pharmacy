# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_02_04_185902) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "category_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", force: :cascade do |t|
    t.string "product_name", null: false
    t.string "product_code"
    t.integer "category_id"
    t.string "weight"
    t.integer "pack_quantity", default: 0, null: false
    t.integer "unit_packing", default: 0, null: false
    t.integer "total_quantity", default: 0, null: false
    t.integer "reorder_level", default: 0, null: false
    t.integer "retail_selling_price", default: 0, null: false
    t.integer "wholesale_selling_price", default: 0, null: false
    t.string "shelving"
    t.string "search_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "suppliers", force: :cascade do |t|
    t.string "supplier_name", null: false
    t.string "address"
    t.string "phone_number"
    t.string "supplier_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "full_name", null: false
    t.string "username", null: false
    t.integer "access_level_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
