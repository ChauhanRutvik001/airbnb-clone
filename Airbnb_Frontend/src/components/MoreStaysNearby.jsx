import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiHeart, FiStar } from 'react-icons/fi';

export default function MoreStaysNearby() {
  const [carouselPage, setCarouselPage] = useState(0);

  const nearbyStays = [
    {
      id: 1,
      title: 'Beautiful Studio with a view to die for',
      price: '₹23,600',
      rating: '4.91',
      reviews: '31',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 2,
      title: 'NAQAB - Ibhk with private pool plunge pool, Calangute',
      price: '₹42,218',
      rating: '4.95',
      reviews: '2',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 3,
      title: 'Greentique Luxury Flat with plunge pool, Calangute',
      price: '₹44,506',
      rating: '4.94',
      reviews: '2',
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 4,
      title: 'The Tropical Studio | 5 mins to Beach',
      price: '₹22,824',
      rating: '4.96',
      reviews: '2',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 5,
      title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
      price: '₹39,942',
      rating: '4.95',
      reviews: '2',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 6,
      title: 'Serendipity Cottage - Calm Stay in Calangute',
      price: '₹22,824',
      rating: '4.92',
      reviews: '2',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 7,
      title: 'Beachfront Paradise with Modern Amenities',
      price: '₹35,500',
      rating: '4.88',
      reviews: '15',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=500&q=80',
    },
  ];

  const itemsPerPage = 5;

  // Calculate pages with smart handling for last page
  const calculatePages = () => {
    const pages = [];
    let startIndex = 0;

    while (startIndex < nearbyStays.length) {
      const endIndex = Math.min(startIndex + itemsPerPage, nearbyStays.length);
      
      // If there aren't enough items for a full page, show the last 5
      if (endIndex - startIndex < itemsPerPage && nearbyStays.length > itemsPerPage) {
        pages.push({
          items: nearbyStays.slice(Math.max(0, nearbyStays.length - itemsPerPage)),
          startIndex: Math.max(0, nearbyStays.length - itemsPerPage),
        });
        break;
      } else {
        pages.push({
          items: nearbyStays.slice(startIndex, endIndex),
          startIndex,
        });
      }
      
      startIndex = endIndex;
    }

    return pages;
  };

  const pages = calculatePages();
  const totalPages = pages.length;

  const handlePrevPage = () => {
    setCarouselPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextPage = () => {
    setCarouselPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section className="mb-12 mt-16 border-t border-[#EBEBEB] pt-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-[#222]">More stays nearby</h2>
        <div className="flex items-center gap-4">
          <span className="text-[15px] font-medium text-[#717171]">
            {carouselPage + 1} / {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrevPage}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDDDDD] bg-white text-[#222] transition hover:bg-[#F7F7F7] disabled:opacity-50"
              disabled={totalPages <= 1}
            >
              <FiChevronLeft className="text-[18px]" />
            </button>
            <button
              type="button"
              onClick={handleNextPage}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDDDDD] bg-white text-[#222] transition hover:bg-[#F7F7F7] disabled:opacity-50"
              disabled={totalPages <= 1}
            >
              <FiChevronRight className="text-[18px]" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[18px]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${carouselPage * 100}%)`,
          }}
        >
          {pages.map((page, pageIndex) => (
            <div key={pageIndex} className="flex w-full shrink-0 gap-4">
              {page.items.map((stay) => (
                <div
                  key={stay.id}
                  className="min-w-[calc(20%-0.8rem)] cursor-pointer transition hover:scale-105"
                >
                  <div className="group space-y-3">
                    <div className="relative overflow-hidden rounded-xl bg-[#F3F3F3]">
                      <img
                        src={stay.image}
                        alt={stay.title}
                        className="h-48 w-full object-cover transition group-hover:scale-110"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#222] shadow-[0_1px_3px_rgba(0,0,0,0.12)] transition hover:bg-[#F7F7F7]"
                      >
                        <FiHeart className="text-[16px]" />
                      </button>
                    </div>
                    <div className="min-h-20 space-y-1 px-0.5">
                      <h3 className="line-clamp-2 text-[15px] font-semibold text-[#222]">{stay.title}</h3>
                      <p className="text-[15px] text-[#717171]">{stay.price}</p>
                      <div className="flex items-center gap-1 text-[14px]">
                        <FiStar className="text-[12px] fill-[#222]" />
                        <span className="font-medium text-[#222]">{stay.rating}</span>
                        <span className="text-[#717171]">({stay.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
