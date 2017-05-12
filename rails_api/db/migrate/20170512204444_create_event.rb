class CreateEvent < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.references :comment_id
      t.references :favorite_id

    end
  end
end
