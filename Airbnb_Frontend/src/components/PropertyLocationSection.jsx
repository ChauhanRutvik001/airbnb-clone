import { FiChevronRight, FiMapPin, FiMinus, FiPlus, FiSearch } from 'react-icons/fi';

function MapPin() {
  return (
    <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#222] text-white shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
      <FiMapPin className="text-[22px]" />
    </div>
  );
}

export default function PropertyLocationSection() {
  return (
    <section className="border-b border-[#EBEBEB] py-10">
      <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-[#222]">Where you&apos;ll be</h2>
      <p className="mt-4 text-[18px] text-[#222]">Candolim, Goa, India</p>

      <div className="relative mt-5 overflow-hidden rounded-[16px] bg-[#D9E8D1] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
        <div className="relative h-[380px] overflow-hidden bg-[#E6F0E0]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-70" />
          <div
            className="absolute left-0 top-0 h-full w-[38%] bg-[#A7D0E8]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 58% 100%, 0 100%)' }}
          />
          <div className="absolute left-[28%] top-[32%] h-20 w-20 rounded-full bg-[#C8E6B0]/80" />
          <div className="absolute right-[24%] top-[43%] h-28 w-28 rounded-full bg-[#C8E6B0]/75" />
          <div className="absolute left-[53%] top-[52%] h-5 w-5 rounded-full bg-[#E8E8E8] shadow-[0_0_0_8px_rgba(255,255,255,0.8)]" />
          <MapPin />

          <button
            type="button"
            className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#222] shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
          >
            <FiSearch className="text-[16px]" />
          </button>

          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[18px] text-[#222] shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
            >
              <FiPlus />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[18px] text-[#222] shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
            >
              <FiMinus />
            </button>
          </div>
        </div>
      </div>

      <p className="mt-3 text-[14px] text-[#717171]">Exact location will be provided after booking.</p>

      <div className="mt-10">
        <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[#222]">Neighbourhood highlights</h3>
        <p className="mt-4 max-w-[900px] text-[16px] leading-7 text-[#222]">
          Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.
        </p>
        <button type="button" className="mt-4 inline-flex items-center gap-1 text-[16px] font-semibold text-[#222] underline underline-offset-4">
          Show more
          <FiChevronRight className="text-[16px]" />
        </button>
      </div>
    </section>
  );
}