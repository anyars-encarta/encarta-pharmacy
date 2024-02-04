class Api::V1::SuppliersController < ApplicationController
  include ActionController::RequestForgeryProtection

  def index
    @suppliers = Supplier.all
    render json: @suppliers.to_json
  end

  def create
    supplier = Supplier.new(supplier_params)

    if supplier.save
      render json: supplier, status: :created
    else
      render json: { errors: supplier.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def supplier_params
    params.require(:supplier).permit(:supplier_name, :address, :phone_number, :supplier_email)
  end
end
