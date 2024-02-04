class Product < ApplicationRecord
    validates :product_name, uniqueness: true, presence: true
    validates :category_id, presence: true

    belongs_to :category
end
