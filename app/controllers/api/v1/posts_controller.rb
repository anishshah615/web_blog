module API
  module V1
    class PostsController < ApplicationController
      before_action :find_post, only: [:show, :update, :destroy]
      before_action :find_user, except: [:index, :show]

      def index
        @posts = Post.all
        render json: @posts
      end

      def create
        @post = @user.posts.build(post_params)
        if @post.save
          render json: @post, status: :created
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end

      def show
        render json: @post
      end

      def update
        if @post.update(post_params)
          render json: @post, status: :ok
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @post.destroy
        head :no_content
      end

      def get_posts        
        @posts = @user.posts        
        render json: @posts
      end

      private
      
      def find_post
        @post = Post.find(params[:id])
      end

      def find_user        
        @user = User.find(params[:user_id].to_i)
      end

      def post_params
        params.require(:post).permit(:title, :content)
      end
    end
  end
end