class AddColorsToProjects < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :color, :string, default: "#00acc1"
  end
end
