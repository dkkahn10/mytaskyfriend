class AddDefaultPhotoToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :current_photo, :string
  end
end
