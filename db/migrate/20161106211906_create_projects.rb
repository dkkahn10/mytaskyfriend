class CreateProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :projects do |t|
      t.belongs_to :user, null: false
      t.string :title, null: false
      t.timestamps
    end
  end
end
