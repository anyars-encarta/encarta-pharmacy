class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :product_name, null: false
      t.string :product_code
      t.integer :category_id
      t.string :weight
      t.integer :pack_quantity, default: 0, null: false
      t.integer :unit_packing, default: 0, null: false
      t.integer :total_quantity, default: 0, null: false
      t.integer :reorder_level, default: 0, null: false
      t.integer :unit_cost, default: 0, null: false
      t.integer :retail_selling_price, default: 0, null: false
      t.integer :wholesale_selling_price, default: 0, null: false
      t.date :expiry_date
      t.string :shelving
      t.string :search_key

      t.timestamps
    end
  end
end
