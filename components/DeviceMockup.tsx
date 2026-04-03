import React from 'react';

interface DeviceMockupProps {
  url?: string;
  screenshot?: string;
  fallbackImage: string;
  alt: string;
}

const DeviceMockup: React.FC<DeviceMockupProps> = ({ url, screenshot, fallbackImage, alt }) => {
  const screenshotUrl = screenshot
    ?? (url ? `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url` : null);

  const image = screenshotUrl ?? fallbackImage;

  return (
    <div className="relative w-full aspect-[4/3] flex items-end justify-center">
      {/* Glow behind devices */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-violet-500/20 blur-[60px] rounded-full" />

      {/* Desktop / Laptop */}
      <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[72%] z-10 group-hover:scale-[1.02] transition-transform duration-500">
        {/* Screen */}
        <div className="bg-gradient-to-b from-slate-700 to-slate-900 rounded-t-xl p-[4px] pb-0 shadow-2xl">
          <div className="bg-slate-900 rounded-t-lg overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center px-3 py-[4px] bg-slate-800/80">
              <div className="flex gap-1">
                <div className="w-[5px] h-[5px] rounded-full bg-red-400/80" />
                <div className="w-[5px] h-[5px] rounded-full bg-yellow-400/80" />
                <div className="w-[5px] h-[5px] rounded-full bg-green-400/80" />
              </div>
              <div className="mx-auto bg-slate-700/50 rounded-md px-6 py-[1px]">
                <div className="w-12 h-[3px] rounded-full bg-slate-500/40" />
              </div>
              <div className="w-8" />
            </div>
            <div className="aspect-[16/10] overflow-hidden">
              <img src={image} alt={alt} className="w-full h-full object-cover object-top" loading="lazy" />
            </div>
          </div>
        </div>
        {/* Stand */}
        <div className="relative mx-auto">
          <div className="bg-gradient-to-b from-slate-600 to-slate-700 h-[4px] mx-[15%] rounded-b-sm" />
          <div className="bg-gradient-to-b from-slate-500 to-slate-600 h-[3px] mx-[25%]" />
          <div className="bg-gradient-to-b from-slate-400/50 to-slate-500/50 h-[5px] mx-[10%] rounded-b-lg" />
        </div>
      </div>

      {/* Tablet */}
      <div className="absolute bottom-[4%] left-[1%] w-[34%] z-20 group-hover:-translate-y-1 group-hover:-rotate-1 transition-all duration-500">
        <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-[3px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)]">
          <div className="bg-slate-900 rounded-lg overflow-hidden">
            {/* Camera dot */}
            <div className="flex justify-center py-[3px]">
              <div className="w-1 h-1 rounded-full bg-slate-600" />
            </div>
            <div className="aspect-[3/4] overflow-hidden">
              <img src={image} alt={alt} className="w-full h-full object-cover object-top" loading="lazy" />
            </div>
            {/* Home bar */}
            <div className="flex justify-center py-[4px]">
              <div className="w-[25%] h-[2px] rounded-full bg-slate-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="absolute bottom-[2%] right-[3%] w-[19%] z-30 group-hover:translate-y-[-4px] group-hover:rotate-1 transition-all duration-500">
        <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-[2px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)]">
          <div className="bg-slate-900 rounded-xl overflow-hidden">
            {/* Notch */}
            <div className="flex justify-center py-[3px]">
              <div className="w-[30%] h-[3px] rounded-full bg-slate-700" />
            </div>
            <div className="aspect-[9/19] overflow-hidden">
              <img src={image} alt={alt} className="w-full h-full object-cover object-top" loading="lazy" />
            </div>
            {/* Home indicator */}
            <div className="flex justify-center py-[3px]">
              <div className="w-[35%] h-[2px] rounded-full bg-slate-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceMockup;
