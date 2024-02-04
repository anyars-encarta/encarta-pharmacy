class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :full_name, null: false
      t.string :username, null: false
      t.integer :access_level_id, null: false
      
      t.timestamps
    end
  end
end
