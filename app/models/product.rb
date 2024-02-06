class Product < ApplicationRecord
  validates :product_name, uniqueness: true, presence: true
  validates :category_id, presence: true

  belongs_to :category

  validates :pack_quantity, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :unit_packing, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :total_quantity, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :reorder_level, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :retail_selling_price, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :wholesale_selling_price, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
