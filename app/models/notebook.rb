class Notebook < ActiveRecord::Base
  belongs_to :dashboard
  has_many :notes, :dependent => :destroy
end
