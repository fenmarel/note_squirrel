class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title, :null => false, :default => 'Untitled'
      t.string :body
      t.references :notebook

      t.timestamps
    end

    add_index :notes, :notebook_id
  end
end
