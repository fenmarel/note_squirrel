class AddFavoriteAndTrashcanToNotebooks < ActiveRecord::Migration
  def change
    add_column :notebooks, :favorite, :boolean, :default => false
    add_column :notebooks, :trashcan, :boolean, :default => false

    add_index :notebooks, :favorite
    add_index :notebooks, :trashcan
  end
end
