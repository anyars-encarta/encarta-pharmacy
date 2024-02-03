class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users.to_json
  end
end
