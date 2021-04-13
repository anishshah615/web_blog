class Comment < ApplicationRecord
	belongs_to :post
	belongs_to :user
	has_many :reactions, dependent: :destroy

  validates :comment, presence: true

  def as_json(options={})
    super(:include => [:user, :reactions] )
  end

end
