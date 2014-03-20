class CreateNotebooks < ActiveRecord::Migration
  def change
    create_table :notebooks do |t|
      t.string :title, :null => false
      t.references :dashboard

      t.timestamps
    end

    add_index :notebooks, :dashboard_id
    add_index :notebooks, [:dashboard_id, :title], :unique => true
  end
end
