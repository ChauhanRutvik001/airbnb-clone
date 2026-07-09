import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCamera, FiCheck, FiClock, FiCoffee, FiDroplet, FiHeart, FiHome, FiLock, FiMapPin, FiShare2, FiShield, FiSun, FiTv, FiWifi, FiWind } from 'react-icons/fi';
import { MdOutlineGridView } from 'react-icons/md';
import { FiChevronDown, FiGlobe, FiSearch, FiStar, SiAirbnb, ModalShell, ModalAmenityItem, TopButton } from './propertyListing/sharedComponents';
import { DetailsColumn, GallerySection, SidebarColumn } from './propertyListing/ListingSections';
import PropertyReviewsSection from './PropertyReviewsSection';
import PropertyLocationSection from './PropertyLocationSection';
import MeetHost from './MeetHost';
import ThingsToKnow from './ThingsToKnow';
import MoreStaysNearby from './MoreStaysNearby';
import { fetchDefaultListing } from '../services/listingApi';

const ICON_MAP = {
  wifi: FiWifi,
  wind: FiWind,
  tv: FiTv,
  home: FiHome,
  mapPin: FiMapPin,
  check: FiCheck,
  droplet: FiDroplet,
  sun: FiSun,
  shield: FiShield,
  camera: FiCamera,
  lock: FiLock,
  coffee: FiCoffee,
  clock: FiClock,
};

const defaultListingData = {
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  content: {
    listingTabs: ['Photos', 'Amenities', 'Reviews', 'Location'],
    galleryImages: [],
    perks: [],
    sleepCards: [],
    octoberWeeks: [],
    novemberWeeks: [],
    descriptionParagraphs: [],
    featuredAmenities: [],
    amenityCategories: [],
  },
};

export default function PropertyListing() {
  const [isSaved, setIsSaved] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
  const [listing, setListing] = useState(defaultListingData);
  const [isLoading, setIsLoading] = useState(true);
  const photosSectionRef = useRef(null);
  const navigate = useNavigate();

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
    const loadListing = async () => {
      try {
        const response = await fetchDefaultListing();
        if (response) {
          setListing(response);
        }
      } catch (error) {
        console.error('Unable to fetch property listing from backend', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadListing();
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isDescriptionModalOpen || isAmenitiesModalOpen ? 'hidden' : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isDescriptionModalOpen, isAmenitiesModalOpen]);

  const listingTabs = listing?.content?.listingTabs ?? [];
  const galleryImages = listing?.content?.galleryImages ?? [];
  const perks = (listing?.content?.perks ?? []).map((perk) => ({
    ...perk,
    icon: ICON_MAP[perk.icon] ?? FiHome,
  }));
  const sleepCards = listing?.content?.sleepCards ?? [];
  const octoberWeeks = listing?.content?.octoberWeeks ?? [];
  const novemberWeeks = listing?.content?.novemberWeeks ?? [];
  const descriptionParagraphs = listing?.content?.descriptionParagraphs ?? [];
  const featuredAmenities = (listing?.content?.featuredAmenities ?? []).map((item) => ({
    ...item,
    icon: ICON_MAP[item.icon] ?? FiHome,
  }));
  const amenityCategories = (listing?.content?.amenityCategories ?? []).map((category) => ({
    ...category,
    items: (category.items ?? []).map((item) => ({
      ...item,
      icon: ICON_MAP[item.icon] ?? FiHome,
    })),
  }));

  if (isLoading) {
    return <div className="p-8 text-[16px] text-[#717171]">Loading property...</div>;
  }

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
            {listingTabs.map((tab, index) =>
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
              ),
            )}
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
            {listing?.title}
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

        <GallerySection photosSectionRef={photosSectionRef} galleryImages={galleryImages} onOpenPhotoTour={openPhotoTour} />

        <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-16">
          <DetailsColumn
            descriptionParagraphs={descriptionParagraphs}
            featuredAmenities={featuredAmenities}
            sleepCards={sleepCards}
            perks={perks}
            octoberWeeks={octoberWeeks}
            novemberWeeks={novemberWeeks}
            onShowDescription={() => setIsDescriptionModalOpen(true)}
            onShowAmenities={() => setIsAmenitiesModalOpen(true)}
          />

          <SidebarColumn />
        </div>

        <PropertyReviewsSection />
        <PropertyLocationSection />
        <MeetHost />
        <ThingsToKnow />
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
            <section key={category.title} className={categoryIndex === 0 ? '' : 'border-t border-[#EBEBEB] pt-8'}>
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
