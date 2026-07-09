const GuestFavouriteBanner = () => {
  return (
    <div className="">
      <div className="w-full min-h-[100px] border border-[#DDDDDD] rounded-[24px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between bg-white text-[#222222] font-sans antialiased box-border">
        
        {/* Left Side: Badge and Controlled Wrapping Text */}
        <div className="flex items-center gap-8 lg:gap-12 flex-1 w-full sm:w-auto" >
          
          {/* Guest Favourite Wreath Badge Component */}
          <div  className="flex items-center justify-center gap-1.5 select-none shrink-0 mx-auto sm:mx-0">
            {/* Left Laurel Wreath Asset */}
            <img 
              src="/laurel-left.png" 
              alt="" 
              className="w-[18px] h-[26px] object-contain"
              draggable="false"
              aria-hidden="true" 
            />
            
            {/* Center Text Badge    */}
            <div className="flex flex-col items-center justify-center text-center leading-[18px] px-2">
              <span className="text-[16px] font-bold tracking-tight">Guest</span>
              <span className="text-[16px] font-bold tracking-tight">favourite</span>
            </div>

            {/* Right Laurel Wreath Asset */}
            <img 
              src="/laurel-right.png" 
              alt="" 
              className="w-[18px] h-[26px] object-contain"
              draggable="false"
              aria-hidden="true" 
            />
          </div>

          {/* Description Text - Fixed max-width ensures exactly 2 lines of text */}
          <p className="text-[16px] leading-[20px] font-normal tracking-tight text-left max-w-[190px] hidden sm:block">
            One of the most loved homes on Airbnb, according to guests
          </p>
        </div>

        {/* Dynamic Fallback Text for Mobile Screens */}
        <p className="text-[15px] leading-[19px] font-normal tracking-tight text-center mt-3 sm:mt-0 mb-4 sm:mb-0 block sm:hidden w-full">
          One of the most loved homes on Airbnb, according to guests
        </p>

        {/* Right Side: Rating & Review Summary Sections */}
        <div className="flex items-center justify-center sm:justify-end gap-6 min-w-[200px] w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-[#EEEEEE]">
          
          {/* Numerical Rating Component */}
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[22px] font-bold leading-7 tracking-tight">4.95</span>
            {/* Precise Micro Star Grid */}
            <div className="flex items-center gap-[1px] mt-1" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 32 32" className="w-[9px] h-[9px] fill-[#222222]" aria-hidden="true">
                  <path d="M16 1l4.55 9.22 10.17 1.48-7.36 7.17 1.74 10.13L16 24.22 6.9 29l1.74-10.13-7.36-7.17 10.17-1.48z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Vertical Separator Line */}
          <div className="w-[1px] h-12 bg-[#DDDDDD] self-center" aria-hidden="true" />

          {/* Count Value Section */}
          <button 
            type="button" 
            className="flex flex-col items-center justify-center text-center group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4 rounded-lg p-1 transition-transform active:scale-95"
          >
            <span className="text-[22px] font-bold leading-7 tracking-tight group-hover:scale-[1.02] transition-transform">19</span>
            <span className="text-[10px] font-bold underline underline-offset-2 text-[#222222] mt-0.5 uppercase tracking-wider">
              REVIEWS
            </span>
          </button>
          
        </div>

      </div>
    </div>
  );
};

export default GuestFavouriteBanner;