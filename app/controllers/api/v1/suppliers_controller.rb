class Api::V1::SuppliersController < ApplicationController
    def index
        @suppliers = Supplier.all
        render json: @suppliers.to_json
      end
end
