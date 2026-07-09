const MeetYourHost = () => {
  // Mock data matching the reference image
  const coHosts = [
    { name: 'Sharath', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' },
    { name: 'Aman Dev Pahwa', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
    { name: 'Maria Karen Priyanka', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
    { name: 'Simran', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80' },
    { name: 'Pallavi', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80' },
    { name: 'Sanyukta', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=100&q=80' },
    { name: 'Shruti', isPlaceholder: true, bgColor: 'bg-pink-100', textColor: 'text-pink-600', initial: 'S' },
    { name: 'Amisha', isPlaceholder: true, bgColor: 'bg-blue-100', textColor: 'text-blue-600', initial: 'A' },
  ];

  return (
    <section className="max-w-[1120px] mx-auto px-6 py-12 font-sans text-[#222222] antialiased">
      <h2 className="text-[22px] font-semibold tracking-tight mb-6">Meet your host</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
        
        {/* Left Side: Host Card & Quick Info */}
        <div className="md:col-span-5 lg:col-span-4 space-y-6">
          {/* Main Card */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] flex items-center justify-between min-h-[220px]">
            {/* Host Brand Profile */}
            <div className="flex flex-col items-center text-center flex-1 pr-4">
              <div className="relative w-[104px] h-[104px]">
                <div className="w-full h-full rounded-full bg-[#133F2E] flex items-center justify-center p-4">
                  {/* Mirashya Homes Logo Placeholder */}
                  <span className="text-white font-serif text-xs font-semibold tracking-widest leading-none">
                    MIRASHYA
                  </span>
                </div>
                {/* Verified Badge */}
                <div className="absolute bottom-0 right-0 bg-[#E61E4D] border-2 border-white rounded-full p-1 shadow-sm">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-white" aria-hidden="true">
                    <path d="M14 4.1L12.6 2.7 6 9.3 3.4 6.7 2 8.1 6 12.1z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mt-4 leading-7">Mirashya Homes</h3>
              <p className="text-sm font-medium text-[#717171] mt-0.5">Host</p>
            </div>

            {/* Divider */}
            <div className="w-[1px] h-32 bg-[#DDDDDD]" />

            {/* Stats Block */}
            <div className="flex flex-col justify-center pl-6 space-y-4 min-w-[100px]">
              <div>
                <p className="text-[22px] font-bold leading-6">1,463</p>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#222222] mt-0.5">Reviews</p>
              </div>
              <div className="border-t border-[#DDDDDD] pt-3">
                <p className="text-[22px] font-bold leading-6 flex items-center gap-0.5">
                  4.68<span className="text-xs">★</span>
                </p>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#222222] mt-0.5">Rating</p>
              </div>
              <div className="border-t border-[#DDDDDD] pt-3">
                <p className="text-[22px] font-bold leading-6">2</p>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#222222] mt-0.5">Years hosting</p>
              </div>
            </div>
          </div>

          {/* Additional Personal Info */}
          <div className="pt-2 space-y-4">
            <div className="flex items-center gap-4 text-base">
              <svg viewBox="0 0 32 32" className="w-6 h-6 stroke-[#222222] stroke-2 fill-none" aria-hidden="true">
                <path d="M16 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 15c-7 0-12 4-12 9v2h24v-2c0-5-5-9-12-9z" />
              </svg>
              <span>Born in the 80s</span>
            </div>
            <div className="flex items-start gap-4 text-base">
              <svg viewBox="0 0 32 32" className="w-6 h-6 stroke-[#222222] stroke-2 fill-none mt-0.5" aria-hidden="true">
                <path d="M16 3 L3 10 L16 17 L29 10 Z M3 10 L3 22 L16 29 L16 17 M29 10 L29 22 L16 29" />
              </svg>
              <span>Where I went to school: NICMAR GOA</span>
            </div>
          </div>
        </div>

        {/* Right Side: Co-hosts & Interaction details */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between">
          <div>
            {/* Co-Hosts Header */}
            <h3 className="text-[18px] font-semibold mb-4">Co-Hosts</h3>
            
            {/* Co-Hosts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 mb-8">
              {coHosts.map((coHost, idx) => (
                <div key={idx} className="flex items-center gap-3 py-1">
                  {coHost.isPlaceholder ? (
                    <div className={`w-10 h-10 rounded-full ${coHost.bgColor} ${coHost.textColor} flex items-center justify-center font-semibold text-sm`}>
                      {coHost.initial}
                    </div>
                  ) : (
                    <img 
                      src={coHost.avatar} 
                      alt={coHost.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <span className="text-base text-[#222222] font-normal truncate">{coHost.name}</span>
                </div>
              ))}
            </div>

            {/* Host Details Block */}
            <h3 className="text-[18px] font-semibold mb-3">Host details</h3>
            <div className="text-base text-[#222222] space-y-1.5 mb-6">
              <p>Response rate: 100%</p>
              <p>Responds within an hour</p>
            </div>

            {/* CTA Interaction Button */}
            <button 
              type="button"
              className="bg-[#222222] hover:bg-black text-white font-semibold rounded-lg px-6 py-3 text-base transition-colors duration-200 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Message host
            </button>
          </div>

          {/* Trust & Safety Disclaimer Footer */}
          <div className="flex items-start gap-3 mt-8 pt-6 border-t border-[#DDDDDD] text-xs text-[#222222] leading-relaxed">
            <svg viewBox="0 0 32 32" className="w-6 h-6 stroke-[#222222] stroke-[1.5] fill-none shrink-0" aria-hidden="true">
              <path d="M16 3s9 2.5 9 9c0 7.5-6 13.5-9 17-3-3.5-9-9.5-9-17 0-6.5 9-9 9-9z" />
            </svg>
            <p>
              To help protect your payment, always use Airbnb to send money and communicate with hosts.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MeetYourHost;