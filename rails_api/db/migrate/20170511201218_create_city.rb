class CreateCity < ActiveRecord::Migration[5.1]
  def change
    create_table :cities do |t|
      t.string :name
      t.integer :zip
      t.string :query_name
    end
  end
end
