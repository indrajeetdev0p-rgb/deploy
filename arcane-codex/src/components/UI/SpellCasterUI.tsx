import { useMemo } from 'react'
import { useStore } from '../../store'
import { Wand2 } from 'lucide-react'
import { soundFx } from '../../utils/audio'

export default function SpellCasterUI() {
  const { isOpen, currentPage, activeBookPages, castSpell, audioEnabled } = useStore()

  const pageData = useMemo(() => {
    const pIndex = Math.min(currentPage, activeBookPages.length - 1);
    return activeBookPages[pIndex] || activeBookPages[0];
  }, [currentPage, activeBookPages]);

  if (!isOpen) return null;

  const leftSpell = pageData?.leftSpellType;
  const rightSpell = pageData?.rightSpellType;

  if (!leftSpell && !rightSpell) return null;

  return (
    <div className="absolute bottom-32 left-0 right-0 pointer-events-none flex justify-center items-end px-20">
      <div className="flex space-x-24">
        {leftSpell && (
          <button 
            onClick={() => {
              castSpell(leftSpell)
              if (audioEnabled) soundFx.playSpellSound(leftSpell)
            }}
            className="pointer-events-auto py-4 px-10 rounded-2xl bg-amber-900/90 text-amber-100 font-cinzel text-xl font-bold tracking-widest hover:bg-amber-800 transition-all flex items-center justify-center space-x-3 shadow-2xl backdrop-blur-sm border-2 border-amber-700/50 hover:scale-105 active:scale-95"
          >
            <Wand2 className="w-6 h-6" />
            <span>Cast {leftSpell.toUpperCase()}</span>
          </button>
        )}

        {rightSpell && (
          <button 
            onClick={() => {
              castSpell(rightSpell)
              if (audioEnabled) soundFx.playSpellSound(rightSpell)
            }}
            className="pointer-events-auto py-4 px-10 rounded-2xl bg-amber-900/90 text-amber-100 font-cinzel text-xl font-bold tracking-widest hover:bg-amber-800 transition-all flex items-center justify-center space-x-3 shadow-2xl backdrop-blur-sm border-2 border-amber-700/50 hover:scale-105 active:scale-95"
          >
            <Wand2 className="w-6 h-6" />
            <span>Cast {rightSpell.toUpperCase()}</span>
          </button>
        )}
      </div>
    </div>
  )
}
