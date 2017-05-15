class FavoriteController < ApplicationController

    def index
      @favorite = Favorite.all
      render json: @favorites
    end

    def create
      @favorite = favorite.create!(favorite_params)
      render json: @favorite
    end

    private
    def favorite_params
      params.require(:comment).permit(:event_id)
    end

end
