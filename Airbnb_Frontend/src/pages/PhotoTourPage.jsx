import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiHeart, FiShare2, FiX } from 'react-icons/fi';
import { MdOutlineGridView } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const photoSections = [
  {
    id: 'living-room-1',
    title: 'Living room 1',
    description: 'Sofa · Air conditioning · Ceiling fan · TV',
    thumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=150&q=80',
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'living-room-2',
    title: 'Living room 2',
    description: 'Ceiling fan · Hot tub · Seating Area',
    thumbnail: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=150&q=80',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'full-kitchen',
    title: 'Full kitchen',
    description: 'Refrigerator · Microwave · Oven · Gas stove',
    thumbnail: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=150&q=80',
    images: [
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556911073-a517e752729c?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    description: 'Queen bed · Wardrobe · Linens · AC',
    thumbnail: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=150&q=80',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'full-bathroom',
    title: 'Full bathroom',
    description: 'Shower · Mirror · Hot water · Towels',
    thumbnail: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=150&q=80',
    images: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'gym',
    title: 'Gym',
    description: 'Treadmill · Stationary bike · Dumbbells',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=150&q=80',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'exterior',
    title: 'Exterior',
    description: 'Building facade · Gated entrance · Parking',
    thumbnail: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=150&q=80',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'pool',
    title: 'Pool',
    description: 'Shared swimming pool · Lounge chairs',
    thumbnail: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=150&q=80',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1530971013997-e06bb52a237f?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'additional-photos',
    title: 'Additional photos',
    description: 'Balcony views · Hallways · Decor details',
    thumbnail: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=150&q=80',
    images: [
      'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497644083578-611b798c60f3?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=400&q=80',
    ],
  },
];

const TOTAL_LIGHTBOX_PHOTOS = 43;

const photoEntries = photoSections.flatMap((section) =>
  section.images.map((src, imageIndex) => ({
    sectionId: section.id,
    sectionTitle: section.title,
    src,
    imageIndex,
  })),
);

const PhotoTourHeader = ({ onBack, isSaved, onToggleSaved }) => (
  <header className="sticky top-0 z-50 flex h-16 items-center border-b border-[#EBEBEB] bg-white">
    <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-6">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#222222] transition hover:bg-[#F7F7F7]"
      >
        <FiChevronLeft className="text-[20px]" />
      </button>

      <h1 className="text-[16px] font-semibold text-[#222222]">Photo tour</h1>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Share"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#222222] transition hover:bg-[#F7F7F7]"
        >
          <FiShare2 className="text-[16px]" />
        </button>
        <button
          type="button"
          aria-label="Save"
          onClick={onToggleSaved}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#222222] transition hover:bg-[#F7F7F7]"
        >
          <FiHeart className={`text-[16px] ${isSaved ? 'fill-[#FF385C] text-[#FF385C]' : ''}`} />
        </button>
      </div>
    </div>
  </header>
);

const SectionNav = ({ sections, activeId, onSelect }) => (
  <div className="border-b border-[#EBEBEB] bg-white pb-6 pt-8">
    <div className="mx-auto flex max-w-[1120px] flex-wrap gap-x-4 gap-y-6 px-6">
      {sections.map((section) => {
        const isActive = section.id === activeId;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSelect(section.id)}
            className="flex flex-col items-start shrink-0 group text-left focus:outline-none"
          >
            <div
              className={`w-[116px] h-[78px] rounded-[10px] overflow-hidden mb-2 border transition ${
                isActive ? 'border-[#222222] scale-[1.01]' : 'border-transparent group-hover:opacity-90'
              }`}
            >
              <img src={section.thumbnail} alt="" className="h-full w-full object-cover" />
            </div>

            <span
              className={`text-[13px] leading-[18px] transition max-w-[116px] ${
                isActive ? 'font-medium text-[#222222]' : 'text-[#717171] group-hover:text-[#222222]'
              }`}
            >
              {section.title}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

const PhotoGallerySection = ({ section, setSectionRef, onOpenPhoto }) => (
  <section
    ref={(node) => setSectionRef(section.id, node)}
    id={section.id}
    className="grid grid-cols-1 gap-6 border-b border-[#F3F3F3] py-10 last:border-0 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12"
  >
    <div className="lg:sticky lg:top-[180px] lg:self-start space-y-1">
      <h2 className="text-[32px] font-semibold text-[#222222] tracking-tight">{section.title}</h2>
      <p className="text-[14px] text-[#717171] leading-relaxed font-normal">{section.description}</p>
    </div>

    <div className="space-y-4">
      <button
        type="button"
        onClick={() => onOpenPhoto(section.id, 0)}
        className="block w-full overflow-hidden rounded-[12px] aspect-[1.5/1] bg-[#F7F7F7]"
      >
        <img
          src={section.images[0]}
          alt={`${section.title} main view`}
          loading="lazy"
          className="h-full w-full cursor-pointer object-cover transition duration-200 hover:opacity-95"
        />
      </button>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onOpenPhoto(section.id, 1)}
          className="overflow-hidden rounded-[12px] aspect-[1.5/1] bg-[#F7F7F7]"
        >
          <img
            src={section.images[1]}
            alt={`${section.title} secondary view 1`}
            loading="lazy"
            className="h-full w-full cursor-pointer object-cover transition duration-200 hover:opacity-95"
          />
        </button>
        <button
          type="button"
          onClick={() => onOpenPhoto(section.id, 2)}
          className="overflow-hidden rounded-[12px] aspect-[1.5/1] bg-[#F7F7F7]"
        >
          <img
            src={section.images[2]}
            alt={`${section.title} secondary view 2`}
            loading="lazy"
            className="h-full w-full cursor-pointer object-cover transition duration-200 hover:opacity-95"
          />
        </button>
      </div>
    </div>
  </section>
);

const PhotoLightbox = ({ photo, currentIndex, totalCount, onClose, onPrevious, onNext }) => {
  if (!photo) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] bg-white">
      <header className="flex h-16 items-center justify-between px-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Back to photo tour"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#222] transition hover:bg-[#F7F7F7]"
        >
          <MdOutlineGridView className="text-[20px]" />
        </button>

        <h1 className="text-[16px] font-semibold text-[#222]">{photo.sectionTitle}</h1>

        <div className="flex items-center gap-3 text-[16px] text-[#222]">
          <span className="whitespace-nowrap">{currentIndex + 1} of {totalCount}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#222] transition hover:bg-[#F7F7F7]"
          >
            <FiX className="text-[20px]" />
          </button>
        </div>
      </header>

      <div className="relative flex h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6">
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous photo"
          className="absolute left-6 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#DDDDDD] bg-white text-[#222] shadow-[0_1px_3px_rgba(0,0,0,0.12)] transition hover:shadow-[0_2px_8px_rgba(0,0,0,0.14)]"
        >
          <FiChevronLeft className="text-[18px]" />
        </button>

        <div className="w-full max-w-[760px]">
          <img
            src={photo.src}
            alt={photo.sectionTitle}
            className="h-auto w-full select-none rounded-[2px] object-cover"
            draggable="false"
          />
        </div>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next photo"
          className="absolute right-6 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#DDDDDD] bg-white text-[#222] shadow-[0_1px_3px_rgba(0,0,0,0.12)] transition hover:shadow-[0_2px_8px_rgba(0,0,0,0.14)]"
        >
          <FiChevronRight className="text-[18px]" />
        </button>
      </div>
    </div>
  );
};

const PhotoTourPage = () => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [activeId, setActiveId] = useState(photoSections[0].id);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState(null);
  const sectionRefs = useRef({});

  const setSectionRef = (sectionId, node) => {
    if (node) {
      sectionRefs.current[sectionId] = node;
    }
  };

  const openPhoto = (sectionId, imageIndex) => {
    const targetIndex = photoEntries.findIndex(
      (entry) => entry.sectionId === sectionId && entry.imageIndex === imageIndex,
    );

    if (targetIndex >= 0) {
      setLightboxPhotoIndex(targetIndex);
    }
  };

  const closePhoto = () => setLightboxPhotoIndex(null);

  const previousPhoto = () => {
    setLightboxPhotoIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return currentIndex === 0 ? photoEntries.length - 1 : currentIndex - 1;
    });
  };

  const nextPhoto = () => {
    setLightboxPhotoIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return currentIndex === photoEntries.length - 1 ? 0 : currentIndex + 1;
    });
  };

  const scrollToSection = (sectionId) => {
    const node = sectionRefs.current[sectionId];
    if (node) {
      const offset = 160; // Perfectly accounts for combined stacked headers hierarchy height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = node.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveId(sectionId);
    }
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = lightboxPhotoIndex === null ? previousOverflow : 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxPhotoIndex]);

  useEffect(() => {
    if (lightboxPhotoIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closePhoto();
      }

      if (event.key === 'ArrowLeft') {
        previousPhoto();
      }

      if (event.key === 'ArrowRight') {
        nextPhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhotoIndex]);

  const currentPhoto = lightboxPhotoIndex === null ? null : photoEntries[lightboxPhotoIndex];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (const section of photoSections) {
        const el = sectionRefs.current[section.id];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#222222] font-sans antialiased select-none">
      <PhotoTourHeader
        onBack={() => navigate('/')}
        isSaved={isSaved}
        onToggleSaved={() => setIsSaved((curr) => !curr)}
      />

      <SectionNav sections={photoSections} activeId={activeId} onSelect={scrollToSection} />

      <main className="max-w-[1120px] mx-auto px-6 pb-24 mt-2">
        <div className="flex flex-col">
          {photoSections.map((section) => (
            <PhotoGallerySection
              key={section.id}
              section={section}
              setSectionRef={setSectionRef}
              onOpenPhoto={openPhoto}
            />
          ))}
        </div>
      </main>

      <PhotoLightbox
        photo={currentPhoto}
        currentIndex={lightboxPhotoIndex ?? 0}
        totalCount={TOTAL_LIGHTBOX_PHOTOS}
        onClose={closePhoto}
        onPrevious={previousPhoto}
        onNext={nextPhoto}
      />
    </div>
  );
};

export default PhotoTourPage;