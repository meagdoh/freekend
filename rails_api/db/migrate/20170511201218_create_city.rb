class CreateCity < ActiveRecord::Migration[5.1]
  def change
    create_table :cities do |t|
      t.string :name
      t.integer :zip
      t.string :long
      t.string :lat
    end
  end
end
