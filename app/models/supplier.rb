class Supplier < ApplicationRecord
    validates :supplier_name, presence: true
end
