class MembershipApplication < ApplicationRecord
  validates :email, :phone, :full_name, :birthday,
            :address, :postal_code, :city, presence: true
  validates :email, uniqueness: true
  validates :username, uniqueness: { allow_blank: true }
  validates :postal_code, length: { is: 5 }
  validates :postal_code, numericality: true
  validates :member_type, inclusion: { in: ["1", "2", "3"],
    message: "Valitse jäsenyyden tyyppi" }
  validate :username_blank_or_between_8_and_25_characters

  def username_blank_or_between_8_and_25_characters
    unless self.username.nil? or (self.username.length > 7)
      errors.add(:username, 'pitää olla tyhjä tai 8-25 merkkiä pitkä')
    end
  end
end