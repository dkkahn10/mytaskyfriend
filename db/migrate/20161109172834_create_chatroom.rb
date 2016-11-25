class CreateChatroom < ActiveRecord::Migration[5.0]
  def change
    create_table :chatrooms do |t|
      t.string :topic
      t.string :slug
      t.boolean :public, null: false, default: false
      t.timestamps
    end
  end
end
