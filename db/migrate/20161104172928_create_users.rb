class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email
      t.datetime :last_signed_in_at
      t.string :username
      t.string :oauth_uid
      t.string :password_digest
      t.integer :sign_in_count, default: 0
      t.string :profile_photo
      t.string :facebook_photo
      t.string :current_photo

      t.timestamps
    end
    add_index :users, :oauth_uid, unique: true
    add_index :users, :username, unique: true
  end
end
