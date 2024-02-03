class CreateSuppliers < ActiveRecord::Migration[7.1]
  def change
    create_table :suppliers do |t|
      t.string :supplier_name, null: false
      t.string :address
      t.string :phone_number
      t.string :supplier_email
      t.timestamps
    end
  end
end
