import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiClock,
  FiCoffee,
  FiCamera,
  FiDroplet,
  FiGlobe,
  FiHeart,
  FiHome,
  FiLock,
  FiMapPin,
  FiSearch,
  FiShare2,
  FiShield,
  FiSun,
  FiStar,
  FiTv,
  FiWifi,
  FiWind,
  FiX,
} from 'react-icons/fi';
import { MdOutlineGridView } from 'react-icons/md';
import { SiAirbnb } from 'react-icons/si';
import PropertyLocationSection from './PropertyLocationSection';
import PropertyReviewsSection from './PropertyReviewsSection';
import MoreStaysNearby from './MoreStaysNearby';
import MeetHost from './MeetHost';
import ThingsToKnow from './ThingsToKnow';
import GuestFavouriteBanner from './GuestFavouriteBanner';

const tabs = ['Photos', 'Amenities', 'Reviews', 'Location'];

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
    alt: 'Spacious living room',
    className: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
    alt: 'Seating area',
  },
  {
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
    alt: 'Jacuzzi',
  },
  {
    src: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1000&q=80',
    alt: 'Bedroom',
  },
  {
    src: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1000&q=80',
    alt: 'Building exterior',
    overlay: true,
  },
];

const perks = [
  {
    icon: FiWind,
    title: 'Outdoor entertainment',
    description: 'The pool and alfresco dining are great for summer trips.',
  },
  {
    icon: FiWind,
    title: 'Designed for staying cool',
    description: 'Beat the heat with the A/C and ceiling fan.',
  },
  {
    icon: FiHome,
    title: 'Self check-in',
    description: 'You can check in with the building staff.',
  },
];

const sleepCards = [
  {
    src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1100&q=80',
    title: 'Bedroom',
    subtitle: '1 double bed',
  },
  {
    src: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1100&q=80',
    title: 'Living room',
    subtitle: '1 sofa',
  },
];

const octoberWeeks = [
  [' ', ' ', ' ', ' ', '1', '2', '3'],
  ['4', '5', '6', '7', '8', '9', '10'],
  ['11', '12', '13', '14', '15', '16', '17'],
  ['18', '19', '20', '21', '22', '23', '24'],
  ['25', '26', '27', '28', '29', '30', '31'],
];

const novemberWeeks = [
  [' ', ' ', ' ', ' ', ' ', ' ', '1'],
  ['2', '3', '4', '5', '6', '7', '8'],
  ['9', '10', '11', '12', '13', '14', '15'],
  ['16', '17', '18', '19', '20', '21', '22'],
  ['23', '24', '25', '26', '27', '28', '29'],
];

const descriptionParagraphs = [
  '🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind.',
  'Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. 💗',
];

const featuredAmenities = [
  { icon: FiWifi, label: 'WiFi' },
  { icon: FiWind, label: 'Air conditioning' },
  { icon: FiTv, label: 'TV' },
  { icon: FiHome, label: 'Kitchen' },
  { icon: FiMapPin, label: 'Free parking on premises' },
  { icon: FiHome, label: 'Pool' },
  { icon: FiHome, label: 'Hot tub' },
  { icon: FiCheck, label: 'Self check-in' },
];

const amenityCategories = [
  {
    title: 'Bathroom',
    items: [
      { icon: FiWind, label: 'Hair dryer' },
      { icon: FiDroplet, label: 'Shampoo' },
      { icon: FiDroplet, label: 'Conditioner' },
      { icon: FiDroplet, label: 'Hot water' },
    ],
  },
  {
    title: 'Bedroom & Laundry',
    items: [
      { icon: FiHome, label: 'Bed linens' },
      { icon: FiHome, label: 'Extra pillows and blankets' },
      { icon: FiHome, label: 'Iron' },
      { icon: FiHome, label: 'Hangers' },
    ],
  },
  {
    title: 'Entertainment',
    items: [
      { icon: FiTv, label: 'TV' },
      { icon: FiHome, label: 'Books and reading material' },
      { icon: FiHome, label: 'Sound system' },
      { icon: FiHome, label: 'Board games' },
    ],
  },
  {
    title: 'Family',
    items: [
      { icon: FiHome, label: 'Crib' },
      { icon: FiHome, label: 'High chair' },
      { icon: FiHome, label: 'Babysitter recommendations' },
      { icon: FiHome, label: 'Children’s books and toys' },
    ],
  },
  {
    title: 'Heating & Cooling',
    items: [
      { icon: FiWind, label: 'Air conditioning' },
      { icon: FiWind, label: 'Ceiling fan' },
      { icon: FiSun, label: 'Portable heater' },
      { icon: FiSun, label: 'Room-darkening shades' },
    ],
  },
  {
    title: 'Home Safety',
    items: [
      { icon: FiShield, label: 'Smoke alarm' },
      { icon: FiShield, label: 'Carbon monoxide alarm' },
      { icon: FiShield, label: 'First aid kit' },
      { icon: FiCamera, label: 'Exterior security cameras on property' },
    ],
  },
  {
    title: 'Internet & Office',
    items: [
      { icon: FiWifi, label: 'WiFi' },
      { icon: FiHome, label: 'Dedicated workspace' },
      { icon: FiHome, label: 'Ethernet connection' },
      { icon: FiClock, label: 'Laptop-friendly workspace' },
    ],
  },
  {
    title: 'Kitchen & Dining',
    items: [
      { icon: FiHome, label: 'Kitchen' },
      { icon: FiCoffee, label: 'Coffee maker' },
      { icon: FiHome, label: 'Microwave' },
      { icon: FiHome, label: 'Blender' },
    ],
  },
  {
    title: 'Location Features',
    items: [
      { icon: FiMapPin, label: 'Beach access' },
      { icon: FiMapPin, label: 'Private entrance' },
      { icon: FiMapPin, label: 'Resort access' },
      { icon: FiMapPin, label: 'Sea view' },
    ],
  },
  {
    title: 'Outdoor',
    items: [
      { icon: FiSun, label: 'Patio or balcony' },
      { icon: FiSun, label: 'Outdoor furniture' },
      { icon: FiSun, label: 'Sun loungers' },
      { icon: FiSun, label: 'Garden view' },
    ],
  },
  {
    title: 'Parking & Facilities',
    items: [
      { icon: FiMapPin, label: 'Free parking on premises' },
      { icon: FiHome, label: 'Pool' },
      { icon: FiHome, label: 'Hot tub' },
      { icon: FiHome, label: 'Gym' },
      { icon: FiHome, label: 'Elevator' },
    ],
  },
  {
    title: 'Services',
    items: [
      { icon: FiCheck, label: 'Self check-in' },
      { icon: FiCheck, label: 'Cleaning available during stay' },
      { icon: FiLock, label: 'Long-term stays allowed' },
      { icon: FiCheck, label: 'Luggage dropoff allowed' },
      { icon: FiCheck, label: 'Pets allowed' },
    ],
  },
];

function AmenityItem({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-4 text-[18px] text-[#222]">
      <Icon className="text-[28px] text-[#222]" />
      <span>{label}</span>
    </div>
  );
}

function ModalAmenityItem({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-4 py-4 text-[18px] text-[#222]">
      <Icon className="text-[26px] text-[#222]" />
      <span>{label}</span>
    </div>
  );
}

function ModalShell({ open, title, onClose, maxWidth = 'max-w-3xl', children }) {
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

function TopButton({ children, className = '' }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-full border border-[#DDDDDD] bg-white text-[#222] shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] ${className}`}
    >
      {children}
    </button>
  );
}

function CalendarMonth({ title, weeks, leftArrow = false, rightArrow = false, selected = [], range = [], muted = [] }) {
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

export default function PropertyListing() {
  const [isSaved, setIsSaved] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
  const photosSectionRef = useRef(null);
  const navigate = useNavigate();

  const isAnyModalOpen = isDescriptionModalOpen || isAmenitiesModalOpen;

  const openPhotoTour = () => {
    navigate('/photo-tour');
  };

  useEffect(() => {
    const updateHeaderVisibility = () => {
      const photosTop = photosSectionRef.current?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      setIsStickyVisible(photosTop <= 0);
    };

    updateHeaderVisibility();

    window.addEventListener('scroll', updateHeaderVisibility, { passive: true });
    window.addEventListener('resize', updateHeaderVisibility);

    return () => {
      window.removeEventListener('scroll', updateHeaderVisibility);
      window.removeEventListener('resize', updateHeaderVisibility);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isAnyModalOpen]);

  return (
    <div className="min-h-screen bg-white text-[#222]">
        <header className="border-b border-[#EBEBEB] bg-white/95 backdrop-blur">
          <div className="mx-auto flex h-22 max-w-[1560px] items-center justify-between gap-4 px-6 xl:px-12">
            <button type="button" className="flex items-center gap-2 text-[#ff385c]">
              <SiAirbnb className="text-[42px]" />
              <span className="text-[31px] font-semibold tracking-[-0.04em] text-[#ff385c]">airbnb</span>
            </button>

            <button
              type="button"
              className="hidden min-w-90 items-center gap-4 rounded-full border border-[#DDDDDD] bg-white px-4 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] lg:flex xl:min-w-137"
            >
              <span className="flex items-center gap-3 pr-4 text-[15px] font-semibold text-[#222]">
                <span className="text-[20px]">🏠</span>
                Anywhere
              </span>
              <span className="h-7 w-px bg-[#DDDDDD]" />
              <span className="flex-1 text-center text-[15px] font-semibold text-[#222]">Anytime</span>
              <span className="h-7 w-px bg-[#DDDDDD]" />
              <span className="flex-1 text-left text-[15px] text-[#717171]">Add guests</span>
              <span className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#FF385C] text-white shadow-sm">
                <FiSearch className="text-[18px]" />
              </span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="hidden rounded-full px-4 py-3 text-sm font-medium text-[#222] transition hover:bg-[#F7F7F7] md:block"
              >
                Become a host
              </button>
              <TopButton className="px-3 py-3">
                <FiGlobe className="text-[18px]" />
              </TopButton>
              <TopButton className="gap-3 px-3 py-3">
                <span className="text-[20px] leading-none">☰</span>
                
              </TopButton>
            </div>
          </div>
        </header>

        <div
          className={`fixed left-0 right-0 top-0 z-50 border-b border-[#EBEBEB] bg-white transition-[opacity,transform] duration-800 ease-out ${
            isStickyVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
          }`}
        >
          <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-8 px-6 py-4 xl:px-12">
            <div className="flex items-center gap-8 text-[16px] font-medium text-[#717171]">
              {tabs.map((tab, index) => (
                tab === 'Photos' ? (
                  <Link
                    key={tab}
                    to="/photo-tour"
                    className={`pb-2 transition ${index === 0 ? 'border-b-2 border-[#222] text-[#222]' : 'hover:text-[#222]'}`}
                  >
                    {tab}
                  </Link>
                ) : (
                  <button
                    key={tab}
                    type="button"
                    className={`pb-2 transition ${index === 0 ? 'border-b-2 border-[#222] text-[#222]' : 'hover:text-[#222]'}`}
                  >
                    {tab}
                  </button>
                )
              ))}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <div className="text-right">
                <div className="text-[16px] font-semibold leading-none text-[#222]">
                  ₹28,499 <span className="font-normal text-[#717171]">for 5 nights</span>
                </div>
                <div className="mt-1 flex items-center justify-end gap-1 text-[14px] text-[#222]">
                  <FiStar className="text-[12px] fill-[#222]" />
                  <span>4.95</span>
                  <span className="text-[#717171]">· 19 reviews</span>
                </div>
              </div>
              <button
                type="button"
                className="rounded-full bg-linear-to-r from-[#ff385c] to-[#d70466] px-6 py-3 text-[16px] font-semibold text-white shadow-[0_8px_20px_rgba(255,56,92,0.25)] transition hover:brightness-105"
              >
                Reserve
              </button>
            </div>
          </div>
        </div>

      <main className="mx-auto max-w-[1200px] px-6 pb-20 pt-8 xl:px-12">
        <div className="mb-6 flex items-start justify-between gap-8">
          <h1 className="max-w-245 text-[32px] font-semibold tracking-[-0.03em] text-[#222] md:text-[38px]">
            Romantic Jacuzzi 1BHK Candolim | Mirashya UG10
          </h1>

          <div className="hidden items-center gap-6 pt-2 md:flex">
            <button type="button" className="flex items-center gap-2 text-[16px] font-medium text-[#222] underline-offset-4 hover:underline">
              <FiShare2 className="text-[18px]" />
              Share
            </button>
            <button
              type="button"
              onClick={() => setIsSaved((current) => !current)}
              className="flex items-center gap-2 text-[16px] font-medium text-[#222] underline-offset-4 hover:underline"
            >
              <FiHeart className={`text-[18px] ${isSaved ? 'fill-[#ff385c] text-[#ff385c]' : ''}`} />
              Save
            </button>
          </div>
        </div>

        <section ref={photosSectionRef} className="mb-10 overflow-hidden rounded-[22px]">
          <div className="grid h-130 grid-cols-4 grid-rows-2 gap-2 overflow-hidden">
            {galleryImages.map((image) => (
              <div key={image.alt} className={`relative overflow-hidden bg-[#F3F3F3] ${image.className ?? ''}`}>
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                {image.overlay ? (
                  <button
                    type="button"
                    onClick={openPhotoTour}
                    className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl border border-[#B0B0B0] bg-white px-4 py-2 text-[14px] font-medium text-[#222] shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
                  >
                    <MdOutlineGridView className="text-[16px]" />
                    Show all photos
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-16">
          <div className="min-w-0 space-y-8">
            <section className="">
              {/* <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <FiAward className="text-[34px] text-[#222]" />
                  <div>
                    <div className="text-[20px] font-semibold text-[#222]">Guest favourite</div>
                    <div className="max-w-[320px] text-[16px] leading-6 text-[#222]">
                      One of the most loved homes on Airbnb, according to guests
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8 border-l border-[#DDDDDD] pl-8">
                  <div className="text-center">
                    <div className="text-[28px] font-semibold text-[#222]">4.95</div>
                    <div className="mt-1 flex justify-center gap-0.5 text-[#222]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FiStar key={index} className="text-[14px] fill-[#222]" />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[28px] font-semibold text-[#222]">19</div>
                    <div className="text-[16px] text-[#222]">Reviews</div>
                  </div>
                </div>
              </div> */}

              <GuestFavouriteBanner />
            </section>

            <section className="flex items-center gap-4 border-b border-[#EBEBEB] pb-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1F5E46] text-[14px] font-semibold text-white">
                MIRASHYA
              </div>
              <div>
                <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-[#222]">Hosted by Mirashya Homes</h2>
                <p className="mt-1 text-[17px] text-[#717171]">2 years hosting</p>
              </div>
            </section>

            <section className="space-y-6 border-b border-[#EBEBEB] pb-10">
              {perks.map((perk) => {
                const Icon = perk.icon;
                return (
                  <div key={perk.title} className="flex gap-5">
                    <Icon className="mt-0.5 text-[24px] text-[#222]" />
                    <div>
                      <h3 className="text-[18px] font-semibold text-[#222]">{perk.title}</h3>
                      <p className="mt-1 text-[16px] leading-6 text-[#717171]">{perk.description}</p>
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="space-y-4">
              <div className="rounded-[14px] bg-[#F7F7F7] px-5 py-4 text-[16px] leading-7 text-[#222]">
                Some info has been automatically translated.{' '}
                <button type="button" className="font-semibold underline underline-offset-4">
                  Show original
                </button>
              </div>

              <div className="space-y-3 text-[18px] leading-8 text-[#222]">
                <div
                  className="overflow-hidden"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 4,
                  }}
                >
                  {descriptionParagraphs.map((paragraph) => (
                    <p key={paragraph} className="mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsDescriptionModalOpen(true)}
                  className="text-[18px] font-semibold text-[#222] underline underline-offset-4 transition hover:text-black"
                >
                  Show more
                </button>
              </div>
            </section>

            <section className="border-y border-[#EBEBEB] py-10">
              <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-[#222]">Where you'll sleep</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {sleepCards.map((card) => (
                  <article key={card.title} className="space-y-3">
                    <img src={card.src} alt={card.title} className="h-65 w-full rounded-2xl object-cover" />
                    <h3 className="text-[18px] font-semibold text-[#222]">{card.title}</h3>
                    <p className="text-[16px] text-[#717171]">{card.subtitle}</p>
                  </article>
                ))}
              </div>
            </section>

            

            <section className="space-y-6 border-b border-[#EBEBEB] pb-10">
              <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-[#222]">What this place offers</h2>
              <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-16">
                {featuredAmenities.map((amenity) => {
                  const Icon = amenity.icon;
                  return <AmenityItem key={amenity.label} icon={Icon} label={amenity.label} />;
                })}
              </div>
              <button
                type="button"
                onClick={() => setIsAmenitiesModalOpen(true)}
                className="rounded-[14px] border border-[#222] px-6 py-4 text-[18px] font-semibold text-[#222] transition hover:bg-[#F7F7F7]"
              >
                Show all 50 amenities
              </button>
            </section>

            <section className="border-b border-[#EBEBEB] pb-10">
              <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-[#222]">5 nights in Candolim</h2>
              <p className="mt-3 text-[18px] text-[#717171]">18 Oct 2026 - 23 Oct 2026</p>

              <div className="mt-8 grid gap-12 lg:grid-cols-2">
                <CalendarMonth
                  title="October 2026"
                  weeks={octoberWeeks}
                  leftArrow
                  selected={['18', '23']}
                  range={['19', '20', '21', '22']}
                />
                <CalendarMonth
                  title="November 2026"
                  weeks={novemberWeeks}
                  rightArrow
                  muted={['18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29']}
                />
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="inline-flex items-center rounded-lg border border-[#B0B0B0] px-2 py-1 text-[15px] text-[#222]">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm border border-[#B0B0B0]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B0B0B0]" />
                  </span>
                </div>
                <button type="button" className="text-[18px] font-semibold text-[#222] underline underline-offset-4">
                  Clear dates
                </button>
              </div>
            </section>

            
          </div>

          <aside className="xl:sticky xl:top-26 xl:self-start">
            <div className="space-y-6">
              <div className="rounded-[18px] border border-[#DDDDDD] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[16px] text-[#222]">
                    Get 10% off your next stay.
                    <button type="button" className="block font-semibold underline underline-offset-4">
                      Terms apply
                    </button>
                  </div>
                  <button
                    type="button"
                    className="rounded-xl bg-[#F7F7F7] px-4 py-3 text-[16px] font-semibold text-[#222] transition hover:bg-[#EFEFEF]"
                  >
                    Claim
                  </button>
                </div>
              </div>

              <div className="rounded-[18px] border border-[#DDDDDD] bg-white px-6 py-7 shadow-[0_4px_18px_rgba(0,0,0,0.08)]">
                <div className="mb-5 flex items-end gap-2">
                  <span className="text-[32px] font-semibold tracking-[-0.03em] text-[#222]">₹28,499</span>
                  <span className="pb-1 text-[18px] text-[#717171]">for 5 nights</span>
                </div>

                <div className="overflow-hidden rounded-[14px] border border-[#B0B0B0]">
                  <div className="grid grid-cols-2 divide-x divide-[#B0B0B0]">
                    <div className="px-4 py-3">
                      <div className="text-[12px] font-semibold text-[#222]">CHECK-IN</div>
                      <div className="mt-1 text-[16px] text-[#222]">10/18/2026</div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="text-[12px] font-semibold text-[#222]">CHECKOUT</div>
                      <div className="mt-1 text-[16px] text-[#222]">10/23/2026</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#B0B0B0] px-4 py-3">
                    <div>
                      <div className="text-[12px] font-semibold text-[#222]">GUESTS</div>
                      <div className="mt-1 text-[16px] text-[#222]">2 guests</div>
                    </div>
                    <FiChevronDown className="text-[18px] text-[#222]" />
                  </div>
                </div>

                <div className="mt-4 rounded-[10px] bg-[#F7F7F7] py-3 text-center text-[16px] text-[#717171]">
                  Free cancellation before <span className="font-semibold text-[#222]">17 October</span>
                </div>

                <button
                  type="button"
                  className="mt-5 w-full rounded-full bg-linear-to-r from-[#ff385c] to-[#d70466] py-4 text-[18px] font-semibold text-white shadow-[0_8px_22px_rgba(255,56,92,0.26)] transition hover:brightness-105"
                >
                  Reserve
                </button>

                <p className="mt-4 text-center text-[16px] text-[#717171]">You won't be charged yet</p>
              </div>

               

             
            </div>

            <div className="text-center">
                <button type="button" className="inline-flex items-center gap-2 text-[16px] text-[#717171] underline underline-offset-4 hover:text-[#222]">
                  <span className="text-[18px]">⚑</span>
                  Report this listing
                </button>
              </div>
          </aside>
        </div>

        <PropertyReviewsSection />
        <PropertyLocationSection />
        <MeetHost />
        <ThingsToKnow/>
        <MoreStaysNearby />
        

      </main>

      <ModalShell
        open={isDescriptionModalOpen}
        title="About this place"
        onClose={() => setIsDescriptionModalOpen(false)}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 text-[18px] leading-8 text-[#222]">
          {descriptionParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </ModalShell>

      <ModalShell
        open={isAmenitiesModalOpen}
        title="What this place offers"
        onClose={() => setIsAmenitiesModalOpen(false)}
        maxWidth="max-w-4xl"
      >
        <div className="space-y-8">
          {amenityCategories.map((category, categoryIndex) => (
            <section
              key={category.title}
              className={`${categoryIndex === 0 ? '' : 'border-t border-[#EBEBEB] pt-8'}`}
            >
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[#222]">{category.title}</h3>
              <div className="mt-4 divide-y divide-[#EBEBEB]">
                {category.items.map((amenity) => {
                  const Icon = amenity.icon;
                  return <ModalAmenityItem key={`${category.title}-${amenity.label}`} icon={Icon} label={amenity.label} />;
                })}
              </div>
            </section>
          ))}
        </div>
      </ModalShell>
    </div>
  );
}
