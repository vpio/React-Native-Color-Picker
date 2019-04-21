class AddReferencesToPalettes < ActiveRecord::Migration[5.2]
  def change
    add_reference :palettes, :user, foreign_key: true
  end
end
