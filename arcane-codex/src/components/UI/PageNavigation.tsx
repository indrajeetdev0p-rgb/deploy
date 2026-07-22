import { useEffect } from 'react'
import { useStore } from '../../store'
import { ChevronLeft, ChevronRight, BookOpen, Sparkles } from 'lucide-react'

export default function PageNavigation() {
  const { 
    isOpen, 
    setIsOpen, 
    currentPage, 
    setCurrentPage,
    nextPage, 
    prevPage, 
    isAutoDemo,
    activeBookPages
  } = useStore()

  const maxPages = activeBookPages.length - 1;

  // Keyboard Arrow Navigation & Auto Demo Interval
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage()
      if (e.key === 'ArrowLeft') prevPage()
      if (e.key === ' ') setIsOpen(!isOpen)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextPage, prevPage, isOpen, setIsOpen])

  useEffect(() => {
    if (!isAutoDemo) return
    const interval = setInterval(() => {
      const { currentPage: curP, secretUnlocked: sec } = useStore.getState()
      const maxP = sec ? 5 : 4
      const nextP = curP >= maxP ? 0 : curP + 1
      useStore.getState().setCurrentPage(nextP)
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoDemo])

  return (
    <>
      {/* Floating Prompt when Book is Closed */}
      {!isOpen && (
        <div className="absolute inset-x-0 bottom-24 flex justify-center z-40 pointer-events-none">
          <button 
            onClick={() => setIsOpen(true)}
            className="glass-panel-gold px-8 py-4 rounded-full pointer-events-auto flex items-center space-x-3 text-amber-200 font-cinzel text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-2xl animate-bounce"
          >
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>Click Grimoire to Open</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </button>
        </div>
      )}

      {/* Floating Page Flip Controls (Left / Right Arrows) */}
      {isOpen && (
        <>
          <div className="absolute inset-y-0 left-6 flex items-center z-40 pointer-events-none">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`glass-button p-4 rounded-full pointer-events-auto transition-all ${
                currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 text-purple-300'
              }`}
              title="Previous Page (Left Arrow)"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-6 flex items-center z-40 pointer-events-none">
            <button
              onClick={nextPage}
              disabled={currentPage >= maxPages}
              className={`glass-button p-4 rounded-full pointer-events-auto transition-all ${
                currentPage >= maxPages ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 text-purple-300'
              }`}
              title="Next Page (Right Arrow)"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Bottom Page Indicator Dots */}
          <div className="absolute bottom-28 inset-x-0 flex justify-center items-center space-x-2 z-40 pointer-events-none">
            <div className="glass-panel px-6 py-2.5 rounded-full pointer-events-auto flex items-center space-x-3">
              {Array.from({ length: maxPages + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentPage === idx 
                      ? 'bg-purple-400 scale-125 shadow-rune-purple' 
                      : 'bg-slate-600/70 hover:bg-slate-400'
                  }`}
                  title={`Jump to Page ${idx * 2 + 1}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
