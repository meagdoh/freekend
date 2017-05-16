class FavoritesController < ApplicationController

    def index
      @favorites = Favorite.all
      render json: @favorites
    end

    def create
      @favorite = Favorite.create!(favorite_params)
      render json: @favorite
    end

    def destroy
      @favorite = Favorite.find(params[:id])
      @favorite.destroy
      render nothing:true
    end

    private
    def favorite_params
      params.require(:favorite).permit(:event_id)
    end

end
