class CreateProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :projects do |t|
      t.string :title, null: false
      t.boolean :public, null: false, default: false
      t.string :color, default: "#00acc1"
      t.timestamps
    end
  end
end
