class FavoritesController < ApplicationController

    def create
      @favorite = favorite.create!(favorite_params)
      render json: @favorite
    end

    private
    def favorite_params
      params.require(:comment).permit(:event_id)
    end

end
