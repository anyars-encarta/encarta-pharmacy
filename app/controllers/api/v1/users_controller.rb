class Api::V1::UsersController < ApplicationController
  include ActionController::RequestForgeryProtection

  def index
    @users = User.all
    render json: @users.to_json
  end

  def create
    user = User.new(user_params)

    if user.save
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    user = User.find(params[:id])

    if user.update(user_params)
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find(params[:id])
    user.destroy

    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(:full_name, :username, :access_level_id)
  end
end
