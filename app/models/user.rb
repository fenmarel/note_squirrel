class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  has_many :dashboards
  has_many :notebooks, :through => :dashboards
  has_many :notes, :through => :notebooks

  def favorites
    self.notebooks.where(favorite: true)
  end

  def to_delete
    self.notebooks.where(trashcan: true)
  end
end


