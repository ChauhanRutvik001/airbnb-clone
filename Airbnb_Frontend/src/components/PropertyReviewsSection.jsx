import { FiStar } from 'react-icons/fi';

const reviewMetrics = [
  { label: 'Overall rating', value: '5' },
  { label: 'Cleanliness', value: '5.0' },
  { label: 'Accuracy', value: '5.0' },
  { label: 'Check-in', value: '5.0' },
  { label: 'Communication', value: '5.0' },
  { label: 'Location', value: '4.8' },
  { label: 'Value', value: '4.8' },
];

const ratingBars = [5, 4, 3, 2, 1];

const reviewTags = [
  'Comfort 6',
  'Accuracy 5',
  'Hot tub 5',
  'Condition 4',
  'Hospitality 8',
  'Cleanliness 4',
  'Amenities 2',
  'Location 1',
];

const reviews = [
  {
    name: 'Amit',
    meta: '2 months on Airbnb',
    date: '1 week ago',
    text: 'Very helpful and responsive team. Safe and peaceful stay, loved everything about the property.',
    avatar: 'A',
  },
  {
    name: 'Aheesh',
    meta: '3 years on Airbnb',
    date: '2 weeks ago',
    text: 'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Samiksha',
    meta: '8 months on Airbnb',
    date: 'May 2026',
    text: 'the host nitish was really great help',
    avatar: 'S',
  },
  {
    name: 'Vedant',
    meta: '4 years on Airbnb',
    date: 'May 2026',
    text: 'We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine....',
    avatar: 'V',
  },
  {
    name: 'Vaibhav S',
    meta: '3 years on Airbnb',
    date: 'May 2026',
    text: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Mohd',
    meta: '5 years on Airbnb',
    date: 'May 2026',
    text: 'Great place. Exactly as described in the listing.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
];

function Avatar({ avatar, name }) {
  if (avatar.startsWith('http')) {
    return <img src={avatar} alt={name} className="h-12 w-12 rounded-full object-cover" />;
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2E6D9] text-[18px] font-medium text-[#8D6A45]">
      {avatar}
    </div>
  );
}

export default function PropertyReviewsSection() {
  return (
    <section className="border-b border-[#EBEBEB] pb-14 pt-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-3 text-[#222] md:gap-5">
          
           {/* Left Laurel Wreath Asset */}
            <img 
              src="/laurel-left.png" 
              alt="" 
              className="h-[110px]"
              draggable="false"
              aria-hidden="true" 
            />
          <div className="text-[72px] font-semibold leading-none tracking-[-0.05em] md:text-[96px]">4.95</div>
           {/* Right Laurel Wreath Asset */}
            <img 
              src="/laurel-right.png" 
              alt="" 
              className="h-[110px]"
              draggable="false"
              aria-hidden="true" 
            />
          
        </div>
        <h2 className="mt-7 text-[24px] font-semibold tracking-[-0.02em] text-[#222]">Guest favourite</h2>
        <p className="mt-3 max-w-[460px] text-[18px] leading-7 text-[#222]">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button type="button" className="mt-5 text-[18px] font-semibold text-[#222] underline underline-offset-4">
          How reviews work
        </button>
      </div>

      <div className="mt-12 grid gap-0 border-t border-[#EBEBEB] pt-10 lg:grid-cols-7">
        <div className="pb-8 lg:border-r lg:border-[#EBEBEB] lg:pr-6">
          <h3 className="text-[18px] font-semibold text-[#222]">Overall rating</h3>
          <div className="mt-4 space-y-3">
            {ratingBars.map((bar) => (
              <div key={bar} className="flex items-center gap-3 text-[14px] text-[#717171]">
                <span className="w-2">{bar}</span>
                <div className="h-1 flex-1 rounded-full bg-[#E6E6E6]">
                  <div className={`h-1 rounded-full bg-[#222] ${bar === 5 ? 'w-[92%]' : bar === 4 ? 'w-[10%]' : 'w-[3%]'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {reviewMetrics.slice(1).map((metric) => (
          <div key={metric.label} className="border-t border-[#EBEBEB] py-8 lg:border-l lg:border-t-0 lg:px-6 lg:py-0">
            <h3 className="text-[18px] font-semibold text-[#222]">{metric.label}</h3>
            <div className="mt-3 text-[28px] font-semibold leading-none text-[#222]">{metric.value}</div>
            <FiStar className="mt-4 text-[34px] text-[#222]" />
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
        {reviewTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex shrink-0 items-center gap-2 rounded-3xl border border-[#DDDDDD] bg-white px-5 py-3 text-[16px] font-semibold text-[#222] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-10 grid gap-x-16 gap-y-12 md:grid-cols-2">
        {reviews.map((review) => (
          <article key={review.name} className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar avatar={review.avatar} name={review.name} />
              <div>
                <h3 className="text-[18px] font-semibold text-[#222]">{review.name}</h3>
                <p className="text-[14px] text-[#717171]">{review.meta}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[#222]">
              {Array.from({ length: 5 }).map((_, index) => (
                <FiStar key={`${review.name}-star-${index}`} className="text-[14px] fill-[#222]" />
              ))}
              <span className="ml-2 text-[14px] text-[#717171]">{review.date}</span>
            </div>

            <p className="text-[16px] leading-6 text-[#222]">{review.text}</p>

            {review.name === 'Aheesh' || review.name === 'Vedant' ? (
              <button type="button" className="text-[16px] font-semibold text-[#222] underline underline-offset-4">
                Show more
              </button>
            ) : null}
          </article>
        ))}
      </div>

      <button
        type="button"
        className="mt-10 rounded-[14px] border border-[#222] px-6 py-3 text-[16px] font-semibold text-[#222] transition hover:bg-[#F7F7F7]"
      >
        Show all 19 reviews
      </button>
    </section>
  );
}