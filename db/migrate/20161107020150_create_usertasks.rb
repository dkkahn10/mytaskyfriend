class CreateUsertasks < ActiveRecord::Migration[5.0]
  def change
    create_table :usertasks do |t|
      t.belongs_to :user, null: false
      t.belongs_to :task, null: false
      t.belongs_to :role
      t.timestamps
    end
    add_index :usertasks, [:user_id, :task_id], unique: true
  end
end
