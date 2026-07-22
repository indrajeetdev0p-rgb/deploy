import { useState } from 'react'
import { useStore } from '../../store'
import type { EnvironmentPreset, LightingPreset } from '../../store'
import { Sun, Mountain, Sparkles, Settings2, X } from 'lucide-react'

export default function ControlDock() {
  const {
    environment,
    setEnvironment,
    lighting,
    setLighting
  } = useStore()

  const [isOpen, setIsOpen] = useState(false)

  const envs: { id: EnvironmentPreset; name: string }[] = [
    { id: 'library', name: 'Ancient Library' },
    { id: 'tower', name: 'Wizard Tower' },
    { id: 'dungeon', name: 'Dark Dungeon' },
    { id: 'forest', name: 'Enchanted Forest' },
    { id: 'sky_temple', name: 'Sky Temple' },
  ]

  const lights: { id: LightingPreset; name: string }[] = [
    { id: 'candlelight', name: 'Candlelight' },
    { id: 'moonlight', name: 'Moonlight' },
    { id: 'mystic', name: 'Mystic Blue' },
    { id: 'inferno', name: 'Inferno Red' },
    { id: 'emerald', name: 'Emerald' },
  ]

  return (
    <div className="absolute bottom-6 inset-x-6 z-40 flex justify-center pointer-events-none">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="glass-panel-gold px-6 py-3 rounded-full pointer-events-auto flex items-center space-x-2 text-amber-200 font-cinzel text-xs font-bold tracking-widest hover:scale-105 transition-all shadow-lg"
        >
          <Settings2 className="w-4 h-4 text-amber-400" />
          <span>Environment Settings</span>
        </button>
      ) : (
        <div className="glass-panel p-4 rounded-3xl pointer-events-auto max-w-3xl w-full shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
          {/* World Atmosphere Bar */}
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-3 mb-3 text-xs font-cinzel">
            <div className="flex items-center space-x-2 text-amber-300">
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="font-bold tracking-wider">WORLD & ENVIRONMENT BACKGROUND</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-slate-400 font-mono text-[10px]">Change Atmosphere</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* World Controls */}
          <div className="flex flex-col space-y-3">
            {/* Realm Environment */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-slate-400 font-mono flex items-center space-x-1 mr-2">
                <Mountain className="w-3.5 h-3.5 text-purple-400" />
                <span>Background:</span>
              </span>
              {envs.map(e => (
                <button
                  key={e.id}
                  onClick={() => setEnvironment(e.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs capitalize transition-all font-sans ${
                    environment === e.id 
                      ? 'bg-purple-600 text-white shadow-rune-purple font-medium' 
                      : 'glass-button text-slate-300'
                  }`}
                >
                  {e.name}
                </button>
              ))}
            </div>

            {/* Lighting Presets */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-slate-400 font-mono flex items-center space-x-1 mr-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Lighting:</span>
              </span>
              {lights.map(l => (
                <button
                  key={l.id}
                  onClick={() => setLighting(l.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs capitalize transition-all font-sans ${
                    lighting === l.id 
                      ? 'bg-amber-600 text-white shadow-lg font-medium' 
                      : 'glass-button text-slate-300'
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
