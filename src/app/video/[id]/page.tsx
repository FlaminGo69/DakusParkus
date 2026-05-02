import React from 'react';
import Link from 'next/link';
import { mockVideos } from '@/lib/data';
import AbbeyDefenseGame from '@/components/AbbeyDefenseGame';

export default async function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = mockVideos.find((v) => v.id.toString() === id) || mockVideos[0];

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-black border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-3xl tracking-tighter">
            <span className="text-white">Pater</span><span className="bg-[#f90] text-black px-1 rounded-sm ml-0.5">Hub</span>
          </Link>
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
      <div className="flex flex-1 overflow-hidden justify-center max-w-7xl mx-auto w-full">
        {/* Main Left Column (Video + Details + Comments) */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto w-full lg:w-2/3 xl:w-3/4">
          
          {/* Video Player / Game */}
          <div className="mb-4">
            <AbbeyDefenseGame />
          </div>

          {/* Video Info */}
          <div className="mb-6 border-b border-gray-800 pb-4">
            <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white">
                    {video.author[0]}
                  </div>
                  <span className="font-semibold text-white hover:text-[#f90] cursor-pointer transition-colors">{video.author}</span>
                </span>
                <span className="bg-gray-800 px-2 py-1 rounded text-xs font-bold hidden sm:inline-block hover:bg-gray-700 cursor-pointer transition-colors">SUBSCRIBE</span>
              </div>
              <div className="flex items-center gap-4">
                <span>{video.views} views</span>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 hover:text-[#f90] transition-colors"><span className="text-xl">👍</span> 69K</button>
                  <button className="flex items-center gap-1 hover:text-[#f90] transition-colors"><span className="text-xl">👎</span></button>
                </div>
                <button className="hidden sm:flex items-center gap-1 bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 transition-colors">Share</button>
                <button className="hidden sm:flex items-center gap-1 bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 transition-colors">Save</button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Comments (420)</h3>
            
            <div className="flex gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#f90] flex items-center justify-center text-black font-bold shrink-0">U</div>
              <input type="text" placeholder="Add a pious comment..." className="w-full bg-transparent border-b border-gray-700 pb-2 focus:outline-none focus:border-white transition-colors" />
            </div>

            <div className="space-y-6">
              {[
                { user: 'FriarTuck', time: '2 hours ago', text: 'This chant brought tears to my eyes. Bless up! 🙏' },
                { user: 'SisterMary', time: '5 hours ago', text: 'Does anyone know the name of the hymn at 4:20? Asking for my abbess.' },
                { user: 'NoviceNed', time: '1 day ago', text: 'First! ...to repent for my sins today.' },
                { user: 'TheInquisitor', time: '2 days ago', text: 'I sense minor heresy in the second verse. Will be reporting this to the authorities.' }
              ].map((comment, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold shrink-0 text-sm">{comment.user[0]}</div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold text-sm hover:text-gray-300 cursor-pointer">{comment.user}</span>
                      <span className="text-xs text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-300">{comment.text}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500 font-bold">
                      <button className="hover:text-white transition-colors">REPLY</button>
                      <button className="hover:text-white transition-colors flex gap-1 items-center">👍 12</button>
                      <button className="hover:text-white transition-colors">👎</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar (Up Next + Ads) */}
        <aside className="w-80 p-4 border-l border-gray-800 hidden lg:block overflow-y-auto custom-scrollbar bg-[#0a0a0a]">
          
          <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-4">Up Next</h3>
          
          <div className="space-y-4 mb-8">
            {mockVideos.filter(v => v.id.toString() !== id).slice(0, 4).map(v => (
              <Link key={v.id} href={`/video/${v.id}`} className="flex gap-2 group cursor-pointer">
                <div className="relative w-32 aspect-video bg-gray-900 shrink-0 border border-gray-800 group-hover:border-[#f90] transition-colors">
                  {v.thumbnailUrl && <img src={v.thumbnailUrl} alt={v.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100" />}
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 px-1 text-[10px] font-mono font-bold rounded text-white z-10">
                    {v.duration}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#f90] transition-colors leading-tight line-clamp-2 mb-1">{v.title}</h4>
                  <p className="text-xs text-gray-400 group-hover:text-white transition-colors">{v.author}</p>
                  <p className="text-xs text-gray-500">{v.views} views</p>
                </div>
              </Link>
            ))}
          </div>

          <hr className="border-gray-800 mb-6" />

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
            <a href="https://www.instagram.com/lolploeg_dakusparkus/" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 p-1 cursor-pointer">
              <div className="bg-black p-2 h-full w-full">
                <div className="text-center text-yellow-400 text-5xl mb-2">📜💰</div>
                <h4 className="text-white font-bold text-sm mb-1 text-center font-mono">BUY 1 INDULGENCE</h4>
                <div className="bg-red-600 text-white font-black text-center text-lg p-1 animate-pulse">GET 2 SINS FREE!</div>
                <p className="text-yellow-300 text-xs text-center mt-1">FLASH SALE BY POPE LEO X</p>
              </div>
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
