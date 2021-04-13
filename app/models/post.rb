class Post < ApplicationRecord
  belongs_to :user

  has_many :comments, dependent: :destroy

  validates :title, presence: true
  validates :content, presence: true
  validate :user, presence: true
end
