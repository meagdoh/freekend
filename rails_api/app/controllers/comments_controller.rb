class CommentsController < ApplicationController

    def index
      @comments = Comment.all
      render json: @coments
    end

    def show
      @comment = comment.find(params[:id])
      render json: @comment
    end

    def create
      @comment = comment.create!(comment_params)
      render json: @comment
    end

    def update
      @comment = comment.find(params[:id])
      @comment.update!(comment_params)
      render json: @comment
    end

    def destroy
      @comment = comment.find(params[:id])
      @comment.destroy
      render nothing:true
    end

    private
    def comment_params
      params.require(:comment).permit(:author, :content, :event_id)
    end

end
