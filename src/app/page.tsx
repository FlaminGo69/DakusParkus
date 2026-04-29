import React from 'react';

const mockVideos = [
  { id: 1, title: 'Hot monk reciting the Psalms', author: 'Brother Thomas', views: '2.5M', duration: '14:20', thumbnailUrl: '/thumbnails/thumb_psalms.png' },
  { id: 2, title: 'Step-friar gets stuck in the cloister', author: 'Abbot Francis', views: '1.2M', duration: '22:15', thumbnailUrl: '/thumbnails/thumb_stuck.png' },
  { id: 3, title: 'Naughty novice breaks fasting rules (GONE WILD)', author: 'Sinner69', views: '800K', duration: '09:45', thumbnailUrl: '/thumbnails/thumb_fasting.png' },
  { id: 4, title: "POV: You're confessing your sins", author: 'Father John', views: '4.1M', duration: '11:05', thumbnailUrl: '/thumbnails/thumb_confession.png' },
  { id: 5, title: 'Gregorian Chants ASMR', author: 'ChoirBoys', views: '6.7M', duration: '55:00', thumbnailUrl: '/thumbnails/thumb_asmr.png' },
  { id: 6, title: 'Relic Unboxing - TRUE CROSS PIECE?!', author: 'HolyRelics', views: '300K', duration: '18:30', thumbnailUrl: '/thumbnails/Relic Unboxing - TRUE CROSS PIECE!.png' },
  { id: 7, title: 'Brewing Trappist Beer (100% EXCLUSIVE)', author: 'DrunkMonk', views: '2.1M', duration: '08:50', thumbnailUrl: '/thumbnails/Brewing Trappist Beer.png' },
  { id: 8, title: 'Vow of Silence Compilation #4', author: 'SilentSteve', views: '901K', duration: '10:00', thumbnailUrl: '/thumbnails/Vow of silence.png' },
  { id: 9, title: 'POV: You are excommunicated', author: 'PopeLife', views: '10.5M', duration: '4:20', thumbnailUrl: '' },
  { id: 10, title: 'Sister Mary caught dancing to secular music', author: 'ConventGossip', views: '550K', duration: '1:15', thumbnailUrl: '' },
  { id: 11, title: 'Fasting speedrun (40 days IN ONE SITTING)', author: 'DesertFather', views: '2.1M', duration: '12:00', thumbnailUrl: '' },
  { id: 12, title: 'Illuminating a manuscript (SATISFYING PENMANSHIP)', author: 'ScribeMaster', views: '4.8M', duration: '45:30', thumbnailUrl: '' },
  { id: 13, title: 'Top 10 Heresies of the 13th Century', author: 'InquisitorTV', views: '8.2M', duration: '15:45', thumbnailUrl: '' },
  { id: 14, title: 'Getting my tonsure haircut (NOT CLICKBAIT)', author: 'NoviceVlogs', views: '950K', duration: '10:20', thumbnailUrl: '' },
  { id: 15, title: 'Singing Vespers but every time we say Amen the bass drops', author: 'DJ_Friar', views: '1.1M', duration: '5:55', thumbnailUrl: '' },
  { id: 16, title: 'Holy Water Challenge - Gone wrong!', author: 'PrankParish', views: '3.4M', duration: '8:40', thumbnailUrl: '' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-black">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-black border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="font-bold text-3xl tracking-tighter">
            <span className="text-white">Pater</span><span className="bg-[#f90] text-black px-1 rounded-sm ml-0.5">Hub</span>
          </div>
        </div>
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <input
            type="text"
            placeholder="Search for sermons, chants, confessions..."
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#f90]"
          />
        </div>
        <div className="flex gap-4">
          <a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 font-bold text-black bg-[#f90] rounded hover:bg-orange-600 transition text-sm sm:text-base inline-flex items-center">
            Go Premium (Indulgences)
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 p-4 border-r border-gray-800 hidden md:block overflow-y-auto custom-scrollbar">
          <nav className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-3">Categories</h3>
              <ul className="space-y-3 text-sm font-semibold">
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-white">Most Pious</a></li>
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-white">Trending Chants</a></li>
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-white">Top Rated Confessions</a></li>
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-white">Live Mass</a></li>
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-white">Sacred Texts</a></li>
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-white">Altar Boy Fails</a></li>
              </ul>
            </div>
            <hr className="border-gray-800" />
            <div>
              <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-3">Filter by Vow</h3>
              <ul className="space-y-3 text-sm font-semibold">
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-gray-300">Poverty</a></li>
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-gray-300">Chastity</a></li>
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-gray-300">Silence</a></li>
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-gray-300">Obedience</a></li>
              </ul>
            </div>
            <hr className="border-gray-800" />
            <div>
              <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-3">Related Monasteries</h3>
              <ul className="space-y-3 text-sm font-semibold">
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-gray-300">Benedictines</a></li>
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-gray-300">Cistercians</a></li>
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-gray-300">Franciscans</a></li>
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-gray-300">Dominicans</a></li>
              </ul>
            </div>
            <hr className="border-gray-800" />
            <div>
              <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-3">Community</h3>
              <ul className="space-y-3 text-sm font-semibold">
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-gray-300">Ask a Priest</a></li>
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-gray-300">Purgatory Support Group</a></li>
                <li><a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#f90] transition-colors text-gray-300">Buy Holy Water</a></li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Video Grid */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-white">Trending Prayers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockVideos.map(video => (
              <a key={video.id} href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block group cursor-pointer">
                {/* Thumbnail placeholder or image */}
                <div className="relative aspect-video bg-black rounded mb-2 overflow-hidden border border-gray-800 group-hover:border-[#f90] transition-colors">
                  {video.thumbnailUrl ? (
                    <img src={video.thumbnailUrl} alt={video.title} className="object-contain w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                      <span className="text-4xl text-gray-800 font-bold opacity-30 mt-2">🙏</span>
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 px-1 text-xs font-mono font-bold rounded text-white z-10">
                    {video.duration}
                  </div>
                </div>
                {/* Info */}
                <h3 className="text-white font-bold group-hover:text-[#f90] transition-colors leading-tight mb-1">{video.title}</h3>
                <div className="flex justify-between items-center text-xs text-gray-400 font-semibold mt-1">
                  <span className="hover:text-white transition-colors">{video.author}</span>
                  <span>{video.views} views</span>
                </div>
              </a>
            ))}
          </div>
        </main>

        {/* Right Sidebar (Ads) */}
        <aside className="w-64 p-4 border-l border-gray-800 hidden xl:block overflow-y-auto bg-[#0a0a0a]">
          <h3 className="font-bold text-gray-500 uppercase text-[10px] tracking-wider mb-4 text-center">Advertisement</h3>
          <div className="space-y-6">
            {/* Ad 1 */}
            <a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block bg-yellow-200 border-4 border-red-600 p-2 cursor-pointer relative overflow-hidden animate-pulse">
              <div className="bg-blue-600 text-yellow-200 font-bold text-center uppercase tracking-widest text-xs mb-1">Warning!</div>
              <div className="bg-white h-24 mb-2 border border-black flex items-center justify-center text-4xl">🙏💕</div>
              <h4 className="text-blue-800 font-extrabold text-sm mb-1 leading-tight underline font-serif">Lonely Monk in your diocese is waiting for you!!!</h4>
              <p className="text-red-600 text-xs font-bold">No vows required. CLICK HERE TO CONFESS NOW &gt;&gt;</p>
            </a>
            {/* Ad 2 */}
            <a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block bg-white border-[3px] border-dashed border-[#00ff00] p-3 cursor-pointer shadow-[0_0_15px_#00ff00]">
              <div className="bg-black h-24 mb-2 flex items-center justify-center text-4xl p-2"><div className="animate-bounce">✨🦴</div></div>
              <h4 className="text-black font-black text-xs mb-1 bg-yellow-300 p-1">HOT NEW RELICS JUST DROPPED IN VATICAN CITY!</h4>
              <p className="text-blue-600 text-[10px] underline leading-tight font-bold">Unbox the Holy Lance today. Limited stock. ⬇️ DOWNLOAD NOW</p>
            </a>
            {/* Ad 3 */}
            <a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 p-1 cursor-pointer">
              <div className="bg-black p-2 h-full w-full">
                <div className="text-center text-yellow-400 text-5xl mb-2">📜💰</div>
                <h4 className="text-white font-bold text-sm mb-1 text-center font-mono">BUY 1 INDULGENCE</h4>
                <div className="bg-red-600 text-white font-black text-center text-lg p-1 animate-pulse">GET 2 SINS FREE!</div>
                <p className="text-yellow-300 text-xs text-center mt-1">FLASH SALE BY POPE LEO X</p>
              </div>
            </a>
            {/* Ad 4 */}
            <a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block bg-[#000080] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-400 p-1 cursor-pointer font-sans">
              <div className="bg-white text-[#000080] font-bold px-1 text-xs mb-1 flex justify-between"><span>System Message</span><span className="cursor-not-allowed text-xs">X</span></div>
              <div className="bg-gray-300 p-2">
                <div className="flex gap-2">
                  <div className="text-3xl">🤫</div>
                  <h4 className="text-black font-bold text-sm underline text-blue-700 leading-tight">Abbots Hate Him!</h4>
                </div>
                <p className="text-black text-[11px] mt-2 leading-tight">Peasant reaches Enlightenment in 3 days using this ONE weird trick...</p>
                <div className="flex justify-center mt-2">
                  <div className="bg-gray-200 border-2 border-gray-500 border-b-black border-r-black px-2 py-1 text-xs font-bold text-black text-center inline-block">Find Out How</div>
                </div>
              </div>
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
