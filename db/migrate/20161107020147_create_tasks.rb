class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.belongs_to :project, null: false
      t.string :body, null: false
      t.string :status
      t.timestamps
    end
  end
end
