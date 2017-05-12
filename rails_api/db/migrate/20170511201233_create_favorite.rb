class CreateFavorite < ActiveRecord::Migration[5.1]
  def change
    create_table :favorites do |t|
      t.integer :event_id
    end
  end
end
