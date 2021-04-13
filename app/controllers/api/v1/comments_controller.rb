module API
  module V1
    class CommentsController < ApplicationController
      before_action :find_comment, only: [:show, :update, :destroy]
      before_action :find_post, except: [:show, :destroy]

      def index
         @comments = @post.comments.order(created_at: :desc)
        render json: @comments
      end

      def create
        @comment = @post.comments.build(comment_params.merge(user_id: params[:user_id]))
        if @comment.save
          render json: @comment, status: :created
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
      end

      def show
        render json: @comment
      end

      def update
        if @comment.update(comment_params)
          render json: @comment, status: :ok
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
      end

      def destroy
        if params[:user_id].to_i == @comment.user_id
          @comment.destroy
          head :no_content
        else
          render json: {message: "You don't have this acess"}
        end
      end


      private

      def find_post
        @post = Post.find(params[:post_id])
      end

      def find_comment
        @comment = Comment.find(params[:id])
      end

      def comment_params
        params.require(:comment).permit(:comment)
      end
    end
  end
end
