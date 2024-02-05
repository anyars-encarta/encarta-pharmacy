class Api::V1::ProductsController < ApplicationController
  include ActionController::RequestForgeryProtection

  def index
    @products = Product.all
    render json: @products.to_json
  end

  def create
    product = Product.new(product_params)

    if product.save
      render json: product, status: :created
    else
      render json: { errors: product.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    product = Product.find(params[:id])

    if product.update(product_params)
      render json: product
    else
      render json: { errors: product.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    product = Product.find(params[:id])
    product.destroy

    head :no_content
  end

  private

  def product_params
    params.require(:product).permit(:product_name, :product_code, :category_id, :weight, :pack_quantity, :unit_packing,
                                    :total_quantity, :reorder_level, :unit_cost, :retail_selling_price,
                                    :wholesale_selling_price, :expiry_date, :shelving, :search_key)
  end
end
