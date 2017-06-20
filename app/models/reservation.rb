class Reservation < ApplicationRecord
  belongs_to :plane

  validates :start, presence: true
  validates :end_at, presence: true
  validates :plane_id, presence: true
  validates :reservation_type, presence: true
  validates :user_id, presence: true

  validate :start_date_before_end_date
  validate :cannot_overlap_another_reservation



  scope :in_range, -> range {
    where('(start BETWEEN ? AND ? OR end_at BETWEEN ? AND ?) OR (start <= ? AND end_at >= ?)', range.first, range.last, range.first, range.last, range.first, range.last)
  }

  scope :exclude_self, -> id { where.not(id: id) }

  def cannot_overlap_another_reservation
    range = Range.new start, end_at
    overlaps = Reservation.exclude_self(id).in_range(range)
    overlap_error unless overlaps.empty?
  end

  def overlap_error
    errors.add(:overlap_error, 'Kyseinen aika on jo varattu')
  end

  def start_date_before_end_date
    if self.start > self.end_at
      errors.add(:start_date_before_end_date, 'Lopetuksen pitää olla aloituksen jälkeen')
    end
  end
end
