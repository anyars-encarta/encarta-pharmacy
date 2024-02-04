# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Users
user1 = User.create(full_name: 'Anyars Yussif', username: 'anyars', access_level_id: 1)
user2 = User.create(full_name: 'Encarta Anyars', username: 'encarta', access_level_id: 2)

# Suppliers
supplier1 = Supplier.create(supplier_name: 'Tobinco Pharmaceuticals', address: 'Abuakwa Sepaase', phone_number: '0245125241', supplier_email: 'supplier1@something.com')
supplier2 = Supplier.create(supplier_name: 'Kinapharma', address: 'Kumasi', phone_number: '0208596548', supplier_email: 'supplier2@something.com')

# Categories
cat1 = Category.create(category_name: 'Tablets')
cat2 = Category.create(category_name: 'Syrups')
cat3 = Category.create(category_name: 'Drop(s)')
cat4 = Category.create(category_name: 'Ointments')
cat5 = Category.create(category_name: 'Creams')