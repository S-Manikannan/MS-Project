class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :userName
      t.string :password
      t.string :userType
      t.string :auth_token

      t.timestamps
    end
  end
end
