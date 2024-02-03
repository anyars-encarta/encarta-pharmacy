class Supplier < ApplicationRecord
    validates :supplier_name, uniqueness: true, presence: true
end
