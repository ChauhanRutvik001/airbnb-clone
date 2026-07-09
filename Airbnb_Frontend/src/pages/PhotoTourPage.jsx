import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiHeart, FiShare2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Comprehensive listing dataset matching all items in the image layout lineup
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

const PhotoTourHeader = ({ onBack, isSaved, onToggleSaved }) => (
  <header className="sticky top-0 z-50 border-b border-[#EBEBEB] bg-white h-16 flex items-center">
    <div className="w-full max-w-[1120px] mx-auto px-6 flex items-center justify-between">
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
  <div className="bg-white border-b border-[#EBEBEB] pt-8 pb-6">
    {/* Inner layout container with wrapping enabled to create two pristine rows */}
    <div className="max-w-[1120px] mx-auto px-6 flex flex-wrap gap-x-4 gap-y-6">
      {sections.map((section) => {
        const isActive = section.id === activeId;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSelect(section.id)}
            className="flex flex-col items-start shrink-0 group text-left focus:outline-none"
          >
            {/* Increased bounding container dimensions to perfectly match the original visual weight */}
            <div 
              className={`w-[116px] h-[78px] rounded-[10px] overflow-hidden mb-2 border transition ${
                isActive ? 'border-[#222222] scale-[1.01]' : 'border-transparent group-hover:opacity-90'
              }`}
            >
              <img 
                src={section.thumbnail} 
                alt="" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Title subtext with matched scaling context */}
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

const PhotoGallerySection = ({ section, setSectionRef }) => (
  <section
    ref={(node) => setSectionRef(section.id, node)}
    id={section.id}
    className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6 lg:gap-12 py-10 border-b border-[#F3F3F3] last:border-0"
  >
    {/* Left Panel: Description */}
    <div className="lg:sticky lg:top-[180px] lg:self-start space-y-1">
      <h2 className="text-[32px] font-semibold text-[#222222] tracking-tight">{section.title}</h2>
      <p className="text-[14px] text-[#717171] leading-relaxed font-normal">{section.description}</p>
    </div>

    {/* Right Panel: Media Block Setup */}
    <div className="space-y-4">
      <div className="w-full overflow-hidden rounded-[12px] aspect-[1.5/1] bg-[#F7F7F7]">
        <img
          src={section.images[0]}
          alt={`${section.title} main view`}
          loading="lazy"
          className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition duration-200"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="overflow-hidden rounded-[12px] aspect-[1.5/1] bg-[#F7F7F7]">
          <img
            src={section.images[1]}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition duration-200"
          />
        </div>
        <div className="overflow-hidden rounded-[12px] aspect-[1.5/1] bg-[#F7F7F7]">
          <img
            src={section.images[2]}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition duration-200"
          />
        </div>
      </div>
    </div>
  </section>
);

const PhotoTourPage = () => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [activeId, setActiveId] = useState(photoSections[0].id);
  const sectionRefs = useRef({});

  const setSectionRef = (sectionId, node) => {
    if (node) {
      sectionRefs.current[sectionId] = node;
    }
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
            <PhotoGallerySection key={section.id} section={section} setSectionRef={setSectionRef} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default PhotoTourPage;