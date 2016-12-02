class CreateUserchatrooms < ActiveRecord::Migration[5.0]
  def change
    create_table :userchatrooms do |t|
      t.belongs_to :user, null: false
      t.belongs_to :chatroom, null: false
      t.belongs_to :role
      t.timestamps
    end
  end
end
