import { FiChevronDown, FiChevronLeft, FiChevronRight, FiCheck, FiClock, FiCoffee, FiCamera, FiDroplet, FiGlobe, FiHeart, FiHome, FiLock, FiMapPin, FiSearch, FiShare2, FiShield, FiSun, FiStar, FiTv, FiWifi, FiWind, FiX } from 'react-icons/fi';
import { SiAirbnb } from 'react-icons/si';

export function AmenityItem({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-4 text-[18px] text-[#222]">
      <Icon className="text-[28px] text-[#222]" />
      <span>{label}</span>
    </div>
  );
}

export function ModalAmenityItem({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-4 py-4 text-[18px] text-[#222]">
      <Icon className="text-[26px] text-[#222]" />
      <span>{label}</span>
    </div>
  );
}

export function ModalShell({ open, title, onClose, maxWidth = 'max-w-3xl', children }) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-[#222]/55 px-4 py-6 opacity-100 backdrop-blur-sm transition-opacity duration-200 ease-out"
      onMouseDown={onClose}
    >
      <div
        className={`relative w-full ${maxWidth} rounded-3xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.24)]`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DDDDDD] bg-white text-[#222] shadow-[0_1px_3px_rgba(0,0,0,0.12)] transition hover:bg-[#F7F7F7]"
        >
          <FiX className="text-[18px]" />
        </button>

        <div className="max-h-[80vh] overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <h2 className="pr-12 text-[26px] font-semibold tracking-[-0.02em] text-[#222]">{title}</h2>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function TopButton({ children, className = '' }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-full border border-[#DDDDDD] bg-white text-[#222] shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] ${className}`}
    >
      {children}
    </button>
  );
}

export function CalendarMonth({ title, weeks, leftArrow = false, rightArrow = false, selected = [], range = [], muted = [] }) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        {leftArrow ? <FiChevronLeft className="text-[20px] text-[#222]" /> : <span />}
        <h3 className="text-[20px] font-semibold text-[#222]">{title}</h3>
        {rightArrow ? <FiChevronRight className="text-[20px] text-[#222]" /> : <span />}
      </div>

      <div className="grid grid-cols-7 gap-y-5 text-center text-[16px] text-[#222]">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={`${title}-${day}`} className="font-medium">
            {day}
          </div>
        ))}

        {weeks.flatMap((week, weekIndex) =>
          week.map((day, dayIndex) => {
            const isSelected = selected.includes(day);
            const isRange = range.includes(day);
            const isMuted = muted.includes(day);

            return (
              <div key={`${title}-${weekIndex}-${dayIndex}`} className="flex h-12 items-center justify-center">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${isSelected ? 'bg-[#222] text-white' : ''} ${isRange ? 'bg-[#F1F1F1]' : ''} ${isMuted ? 'text-[#D1D1D1]' : ''}`}
                >
                  {day}
                </span>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

export { FiChevronDown, FiClock, FiCoffee, FiCamera, FiDroplet, FiGlobe, FiHeart, FiHome, FiLock, FiMapPin, FiSearch, FiShare2, FiShield, FiSun, FiStar, FiTv, FiWifi, FiWind, SiAirbnb };
