module API
  module V1
    class ReactionsController < ApplicationController
      before_action :find_comment, only: [:create, :index]
      before_action :find_reaction, only: [:destroy]
      before_action :reaction_exists, only: [:create, :destroy]

      def index
        @comment.reactions
      end

      def create        
        if !@valid
          @reaction = @comment.reactions.build(reaction_params.merge(user_id: params[:user_id]))
          if @reaction.save
            render json: @reaction, status: :created
          else
            render json: @reaction.errors, status: :unprocessable_entity
          end
        end  
      end
    
      def destroy
        reaction = @reaction.destroy if @valid
      end

      private

      def reaction_exists           
        @valid = Reaction.exists?(user_id: params[:user_id], comment_id: params[:comment_id], label: params[:label])
      end

      def find_comment
        @comment = Comment.find(params[:comment_id])
      end

      def find_reaction
        @reaction = Reaction.find(params[:id])
      end

      def reaction_params
        params.require(:reaction).permit(:emoji, :label)
      end
    end
  end
end
