class CreateDashboards < ActiveRecord::Migration
  def change
    create_table :dashboards do |t|
      t.string :title, :null => false
      t.references :user

      t.timestamps
    end

    add_index :dashboards, :user_id
    add_index :dashboards, [:user_id, :title], :unique => true
  end
end
