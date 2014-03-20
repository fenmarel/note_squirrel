class Dashboard < ActiveRecord::Base
  belongs_to :user
  has_many :notebooks
end
