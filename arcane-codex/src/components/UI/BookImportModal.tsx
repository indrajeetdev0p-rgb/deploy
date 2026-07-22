import { useState } from 'react'
import { useStore } from '../../store'
import { X, Upload, BookOpen, FileText, Check, Sparkles } from 'lucide-react'
import { CLASSIC_BOOKS, paginateRawText, type BookMetadata } from '../../data/classicBooks'
import { BOOK_PAGES } from '../../data/spells'

export default function BookImportModal() {
  const { 
    isImportModalOpen, 
    setIsImportModalOpen,
    setActiveBook,
    activeBookId,
    setCurrentPage,
    setIsOpen
  } = useStore()

  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'paste'>('library')
  const [pastedTitle, setPastedTitle] = useState('')
  const [pastedAuthor, setPastedAuthor] = useState('')
  const [pastedText, setPastedText] = useState('')

  if (!isImportModalOpen) return null

  // Select Classic Book
  const handleSelectBook = (book: BookMetadata) => {
    setActiveBook(book.id, book.title, book.pages)
    setCurrentPage(0)
    setIsOpen(true)
    setIsImportModalOpen(false)
  }

  // Handle File Upload (.txt / .md)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      if (text) {
        const titleName = file.name.replace(/\.[^/.]+$/, "")
        const pages = paginateRawText(text, titleName, "Uploaded Book")
        setActiveBook(`custom_${Date.now()}`, titleName, pages)
        setCurrentPage(0)
        setIsOpen(true)
        setIsImportModalOpen(false)
      }
    }
    reader.readAsText(file)
  }

  // Handle Pasted Text Submission
  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pastedText.trim()) return

    const title = pastedTitle.trim() || "My Custom Book"
    const author = pastedAuthor.trim() || "Anonymous"
    const pages = paginateRawText(pastedText, title, author)
    
    setActiveBook(`custom_${Date.now()}`, title, pages)
    setCurrentPage(0)
    setIsOpen(true)
    setIsImportModalOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel-gold max-w-3xl w-full max-h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-amber-500/40">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-purple-950/40">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="font-cinzel text-lg font-bold text-amber-100">Library & Book Importer</h2>
              <p className="text-xs text-purple-300/70 font-mono">Select a real classic or import your own custom book into 3D</p>
            </div>
          </div>

          <button 
            onClick={() => setIsImportModalOpen(false)}
            className="glass-button p-2.5 rounded-xl text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-amber-500/20 px-6 pt-3 bg-purple-950/20 font-cinzel text-xs">
          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center space-x-2 ${
              activeTab === 'library' ? 'bg-amber-500/20 text-amber-300 border-t-2 border-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> <span>Classic Real Books</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center space-x-2 ${
              activeTab === 'upload' ? 'bg-amber-500/20 text-amber-300 border-t-2 border-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" /> <span>Upload Text File (.txt/.md)</span>
          </button>

          <button
            onClick={() => setActiveTab('paste')}
            className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center space-x-2 ${
              activeTab === 'paste' ? 'bg-amber-500/20 text-amber-300 border-t-2 border-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" /> <span>Paste Custom Text</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: REAL CLASSIC BOOKS */}
          {activeTab === 'library' && (
            <div className="space-y-4">
              {/* Original Arcane Grimoire */}
              <div 
                onClick={() => setActiveBook('arcane', 'Arcane Codex', BOOK_PAGES)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeBookId === 'arcane' ? 'border-amber-400 bg-amber-500/10 shadow-rune-purple' : 'border-purple-500/20 glass-panel hover:border-purple-400'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-900/60 border border-purple-500/50 flex items-center justify-center text-2xl">
                    🔮
                  </div>
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-amber-200">Arcane Codex (Grimoire)</h3>
                    <p className="text-xs text-slate-300">Original fantasy spellbook, potion recipes, & bestiary.</p>
                  </div>
                </div>
                {activeBookId === 'arcane' && <Check className="w-5 h-5 text-amber-400" />}
              </div>

              {/* Real Classics List */}
              {CLASSIC_BOOKS.map(book => (
                <div 
                  key={book.id}
                  onClick={() => handleSelectBook(book)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    activeBookId === book.id ? 'border-amber-400 bg-amber-500/10 shadow-rune-purple' : 'border-purple-500/20 glass-panel hover:border-amber-500/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-900/40 border border-amber-500/40 flex items-center justify-center text-2xl">
                      📖
                    </div>
                    <div>
                      <h3 className="font-cinzel text-base font-bold text-amber-100">{book.title}</h3>
                      <p className="text-xs text-amber-400/80 font-mono">By {book.author}</p>
                      <p className="text-xs text-slate-300 mt-1">{book.description}</p>
                    </div>
                  </div>
                  {activeBookId === book.id && <Check className="w-5 h-5 text-amber-400" />}
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: UPLOAD LOCAL FILE */}
          {activeTab === 'upload' && (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-purple-500/40 rounded-3xl glass-panel text-center">
              <Upload className="w-12 h-12 text-amber-400 mb-4 animate-bounce" />
              <h3 className="font-cinzel text-lg font-bold text-amber-200 mb-2">Upload Custom Book File</h3>
              <p className="text-xs text-slate-300 max-w-md mb-6">
                Upload any plain text file (`.txt`, `.md`). Our 3D pagination engine will automatically format and paginate it into 3D pages!
              </p>
              
              <label className="glass-panel-gold px-6 py-3 rounded-2xl font-cinzel text-xs font-bold text-amber-200 cursor-pointer hover:scale-105 transition-all shadow-lg">
                <span>Choose .txt File</span>
                <input 
                  type="file" 
                  accept=".txt,.md,.text" 
                  onChange={handleFileUpload}
                  className="hidden" 
                />
              </label>
            </div>
          )}

          {/* TAB 3: PASTE CUSTOM TEXT */}
          {activeTab === 'paste' && (
            <form onSubmit={handlePasteSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cinzel text-amber-300 mb-1">Book Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. My Secret Novel"
                    value={pastedTitle}
                    onChange={e => setPastedTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-cinzel text-amber-300 mb-1">Author Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Jane Doe"
                    value={pastedAuthor}
                    onChange={e => setPastedAuthor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-cinzel text-amber-300 mb-1">Book Content (Paste Text)</label>
                <textarea 
                  rows={8}
                  placeholder="Paste your story, article, or novel text here..."
                  value={pastedText}
                  onChange={e => setPastedText(e.target.value)}
                  className="w-full p-4 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none font-sans"
                />
              </div>

              <button 
                type="submit"
                disabled={!pastedText.trim()}
                className="w-full py-3 rounded-2xl glass-panel-gold font-cinzel text-xs font-bold text-amber-200 hover:scale-102 transition-all flex items-center justify-center space-x-2 disabled:opacity-40 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Format & Read in 3D</span>
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  )
}
