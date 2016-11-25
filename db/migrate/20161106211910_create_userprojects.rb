class CreateUserprojects < ActiveRecord::Migration[5.0]
  def change
    create_table :userprojects do |t|
      t.belongs_to :user, null: false
      t.belongs_to :project, null: false
      t.belongs_to :role
      t.timestamps
    end
    add_index :users, :projects, unique: true
  end
end
