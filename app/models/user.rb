class User < ApplicationRecord
  validates :full_name, presence: true
  validates :username, presence: true, uniqueness: { case_sensitive: false }
end
