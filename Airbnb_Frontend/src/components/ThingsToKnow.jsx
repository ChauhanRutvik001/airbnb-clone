const ThingsToKnow = () => {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-12 font-sans text-[#222222] antialiased border-t border-[#DDDDDD]">
      {/* Section Header */}
      <h2 className="text-[22px] font-semibold tracking-tight mb-6">Things to know</h2>
      
      {/* Three Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
        
        {/* Column 1: Cancellation policy */}
        <div className="flex flex-col">
          <div className="mb-3">
            {/* Custom Calendar Icon with an 'X' */}
            <svg viewBox="0 0 32 32" className="w-6 h-6 stroke-[#222222] stroke-[2] fill-none" aria-hidden="true">
              <rect x="3" y="5" width="26" height="24" rx="3" />
              <line x1="3" y1="11" x2="29" y2="11" />
              <line x1="9" y1="2" x2="9" y2="5" />
              <line x1="23" y1="2" x2="23" y2="5" />
              <path d="M13 17 l6 6 M19 17 l-6 6" />
            </svg>
          </div>
          <h3 className="text-base font-semibold mb-3">Cancellation policy</h3>
          <div className="text-[15px] leading-[20px] text-[#222222] space-y-3 flex-1">
            <p>
              Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.
            </p>
            <p>Review this host’s full policy for details.</p>
          </div>
          <button 
            type="button" 
            className="mt-4 self-start text-sm font-semibold underline underline-offset-2 hover:text-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-black rounded"
          >
            Learn more
          </button>
        </div>

        {/* Column 2: House rules */}
        <div className="flex flex-col">
          <div className="mb-3">
            {/* Custom Key Icon */}
            <svg viewBox="0 0 32 32" className="w-6 h-6 stroke-[#222222] stroke-[2] fill-none" aria-hidden="true">
              <circle cx="12" cy="14" r="7" />
              <path d="M17 19 L27 29 L30 26 L27 23 L24 23 L24 20 L21 20 L19 17" />
              <circle cx="10" cy="12" r="1.5" className="fill-[#222222]" />
            </svg>
          </div>
          <h3 className="text-base font-semibold mb-3">House rules</h3>
          <div className="text-[15px] leading-[20px] text-[#222222] space-y-3 flex-1">
            <p>Check-in after 2:00 pm</p>
            <p>Checkout before 11:00 am</p>
            <p>3 guests maximum</p>
          </div>
          <button 
            type="button" 
            className="mt-4 self-start text-sm font-semibold underline underline-offset-2 hover:text-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-black rounded"
          >
            Learn more
          </button>
        </div>

        {/* Column 3: Safety & property */}
        <div className="flex flex-col">
          <div className="mb-3">
            {/* Custom Shield Icon */}
            <svg viewBox="0 0 32 32" className="w-6 h-6 stroke-[#222222] stroke-[2] fill-none" aria-hidden="true">
              <path d="M16 3 s9 2.5 9 9 c0 7.5 -6 13.5 -9 17 c-3 -3.5 -9 -9.5 -9 -17 c0 -6.5 9 -9 9 -9z" />
            </svg>
          </div>
          <h3 className="text-base font-semibold mb-3">Safety & property</h3>
          <div className="text-[15px] leading-[20px] text-[#222222] space-y-3 flex-1">
            <p>Carbon monoxide alarm not reported</p>
            <p>Smoke alarm not reported</p>
            <p>Exterior security cameras on property</p>
          </div>
          <button 
            type="button" 
            className="mt-4 self-start text-sm font-semibold underline underline-offset-2 hover:text-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-black rounded"
          >
            Learn more
          </button>
        </div>

      </div>
    </section>
  );
};

export default ThingsToKnow;