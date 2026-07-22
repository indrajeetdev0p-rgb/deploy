import { useStore } from '../../store'
import { Volume2, VolumeX, Camera, Play, Pause, RefreshCw, Upload } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function Header() {
  const { 
    audioEnabled, 
    setAudioEnabled, 
    isAutoDemo, 
    setIsAutoDemo,
    setIsOpen,
    setCurrentPage,
    setIsImportModalOpen,
    activeBookTitle
  } = useStore()

  // Take Screenshot
  const handleScreenshot = () => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return
    const image = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = image
    a.download = `arcane-codex-screenshot-${Date.now()}.png`
    a.click()

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    })
  }

  return (
    <header className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-none">
      {/* Title & Brand Logo */}
      <div className="flex items-center space-x-3 glass-panel px-5 py-3 rounded-2xl pointer-events-auto">
        <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/50 flex items-center justify-center text-xl shadow-rune-purple">
          📖
        </div>
        <div>
          <h1 className="font-cinzel text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-purple-300 to-sky-300">
            {activeBookTitle.toUpperCase()}
          </h1>
          <p className="text-xs text-purple-300/70 font-mono">3D e-Book Reader</p>
        </div>
      </div>

      {/* Action Utility Buttons */}
      <div className="flex items-center space-x-3 pointer-events-auto">

        {/* Library & Import Book Button */}
        <button 
          onClick={() => setIsImportModalOpen(true)}
          className="glass-panel-gold px-4 py-2 rounded-xl flex items-center space-x-2 text-xs font-cinzel text-amber-200 hover:scale-105 transition-all shadow-lg border border-amber-400/60 animate-pulse"
          title="Choose a real book or upload custom text"
        >
          <Upload className="w-4 h-4 text-amber-400" />
          <span>📚 Library & Import Book</span>
        </button>

        {/* Auto Demo Mode */}
        <button 
          onClick={() => setIsAutoDemo(!isAutoDemo)}
          className={`glass-button px-4 py-2.5 rounded-xl flex items-center space-x-2 text-xs font-medium ${
            isAutoDemo ? 'glass-button-active text-sky-300' : 'text-slate-300'
          }`}
          title="Auto Page-Turn Demo Mode"
        >
          {isAutoDemo ? <Pause className="w-4 h-4 text-sky-400" /> : <Play className="w-4 h-4 text-purple-400" />}
          <span className="hidden sm:inline">{isAutoDemo ? 'Auto-Demo ON' : 'Auto-Demo'}</span>
        </button>

        {/* Reset View */}
        <button 
          onClick={() => {
            setIsOpen(false);
            setCurrentPage(0);
          }}
          className="glass-button p-2.5 rounded-xl text-slate-300 hover:text-white"
          title="Reset Book Position"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Screenshot Mode */}
        <button 
          onClick={handleScreenshot}
          className="glass-button p-2.5 rounded-xl text-slate-300 hover:text-amber-300"
          title="Take Screenshot"
        >
          <Camera className="w-4 h-4" />
        </button>

        {/* Audio Toggle */}
        <button 
          onClick={() => setAudioEnabled(!audioEnabled)}
          className={`glass-button p-2.5 rounded-xl ${audioEnabled ? 'text-purple-300' : 'text-slate-500'}`}
          title={audioEnabled ? "Mute Audio" : "Enable Audio"}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </header>
  )
}
