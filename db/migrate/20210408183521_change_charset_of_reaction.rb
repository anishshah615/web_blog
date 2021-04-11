class ChangeCharsetOfReaction < ActiveRecord::Migration[6.0]
  def change
    def self.up
      execute "ALTER TABLE `reactions` CHANGE `handler` `handler` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;"
    end
  end
end
