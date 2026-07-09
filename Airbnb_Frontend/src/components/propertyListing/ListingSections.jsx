import GuestFavouriteBanner from '../GuestFavouriteBanner';
import MeetHost from '../MeetHost';
import MoreStaysNearby from '../MoreStaysNearby';
import PropertyLocationSection from '../PropertyLocationSection';
import PropertyReviewsSection from '../PropertyReviewsSection';
import ThingsToKnow from '../ThingsToKnow';
import { AmenityItem, CalendarMonth } from './sharedComponents';

export function GallerySection({ photosSectionRef, galleryImages, onOpenPhotoTour }) {
  return (
    <section ref={photosSectionRef} className="mb-10 overflow-hidden rounded-[22px]">
      <div className="grid h-130 grid-cols-4 grid-rows-2 gap-2 overflow-hidden">
        {galleryImages.map((image) => (
          <div key={image.alt} className={`relative overflow-hidden bg-[#F3F3F3] ${image.className ?? ''}`}>
            <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
            {image.overlay ? (
              <button
                type="button"
                onClick={onOpenPhotoTour}
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl border border-[#B0B0B0] bg-white px-4 py-2 text-[14px] font-medium text-[#222] shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
              >
                <span className="text-[16px]">▦</span>
                Show all photos
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export function DetailsColumn({
  descriptionParagraphs,
  featuredAmenities,
  sleepCards,
  perks,
  octoberWeeks,
  novemberWeeks,
  onShowDescription,
  onShowAmenities,
}) {
  return (
    <div className="min-w-0 space-y-8">
      <section>
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
            onClick={onShowDescription}
            className="text-[18px] font-semibold text-[#222] underline underline-offset-4 transition hover:text-black"
          >
            Show more
          </button>
        </div>
      </section>

      <section className="border-y border-[#EBEBEB] py-10">
        <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-[#222]">Where you&apos;ll sleep</h2>
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
          onClick={onShowAmenities}
          className="rounded-[14px] border border-[#222] px-6 py-4 text-[18px] font-semibold text-[#222] transition hover:bg-[#F7F7F7]"
        >
          Show all 50 amenities
        </button>
      </section>

      <section className="border-b border-[#EBEBEB] pb-10">
        <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-[#222]">5 nights in Candolim</h2>
        <p className="mt-3 text-[18px] text-[#717171]">18 Oct 2026 - 23 Oct 2026</p>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <CalendarMonth title="October 2026" weeks={octoberWeeks} leftArrow selected={['18', '23']} range={['19', '20', '21', '22']} />
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
  );
}

export function SidebarColumn() {
  return (
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
              <span className="text-[18px] text-[#222]">⌄</span>
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

          <p className="mt-4 text-center text-[16px] text-[#717171]">You won&apos;t be charged yet</p>
        </div>
      </div>

      <div className="text-center mt-6">
        <button type="button" className="inline-flex items-center gap-2 text-[16px] text-[#717171] underline underline-offset-4 hover:text-[#222]">
          <span className="text-[18px]">⚑</span>
          Report this listing
        </button>
      </div>
    </aside>
  );
}
