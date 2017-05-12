class CreateComment < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.string :author
      t.string :content
      t.integer :event_id
    end
  end
end
