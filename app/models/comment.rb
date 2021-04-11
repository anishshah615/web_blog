class Comment < ApplicationRecord
	belongs_to :post
	belongs_to :user
	has_many :reactions, dependent: :destroy

  def as_json(options={})
    super(:include => :reactions )
  end

end
