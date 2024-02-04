class Category < ApplicationRecord
    validates :category_name, uniqueness: true, presence: true
end
