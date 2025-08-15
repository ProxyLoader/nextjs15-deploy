"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { ChevronDown, ChevronRight, X, ZoomIn, ZoomOut, Phone, MapPin, Clock, Loader2, Wifi, WifiOff } from "lucide-react"

// Simulating react-intersection-observer since it's not available
// In a real project, you would: npm install react-intersection-observer
const useInView = (options = {}) => {
  const [ref, setRef] = useState(null)
  const [inView, setInView] = useState(false)
  const [entry, setEntry] = useState(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        setEntry(entry)
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, options.threshold, options.rootMargin])

  return { ref: setRef, inView, entry }
}

// Optimized lazy image component using intersection observer
const LazyImage = ({ 
  src, 
  alt, 
  className = "", 
  style = {}, 
  onClick, 
  priority = false,
  placeholder = true,
  aspectRatio = "auto"
}) => {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(priority)

  useEffect(() => {
    if (inView || priority) {
      setShouldLoad(true)
    }
  }, [inView, priority])

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    setError(false)
  }, [])

  const handleError = useCallback(() => {
    setError(true)
    setIsLoaded(true)
  }, [])

  return (
    <div 
      ref={ref} 
      className="relative overflow-hidden" 
      style={{ aspectRatio, ...style }}
    >
      {/* Loading placeholder */}
      {!isLoaded && placeholder && (
        <div className={`${className} bg-gradient-to-r from-gray-700/50 via-gray-600/50 to-gray-700/50 animate-pulse flex items-center justify-center backdrop-blur-sm`}>
          <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
        </div>
      )}
      
      {/* Actual image */}
      {shouldLoad && (
        <img
          src={error ? "/placeholder.svg" : (src || "/placeholder.svg")}
          alt={alt}
          className={`${className} transition-all duration-500 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${!isLoaded && !placeholder ? 'absolute inset-0' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          onClick={onClick}
          draggable={false}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      )}
    </div>
  )
}

// Debounce utility
const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// Performance monitoring hook
const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderCount: 0,
    memoryUsage: 0
  })

  useEffect(() => {
    const startTime = performance.now()
    let renderCount = 0

    const updateMetrics = () => {
      renderCount++
      setMetrics(prev => ({
        ...prev,
        loadTime: performance.now() - startTime,
        renderCount,
        memoryUsage: performance.memory ? performance.memory.usedJSHeapSize / 1048576 : 0
      }))
    }

    const interval = setInterval(updateMetrics, 1000)
    return () => clearInterval(interval)
  }, [])

  return metrics
}

export default function RestaurantApp() {
  const [collapsedCategories, setCollapsedCategories] = useState<{ [key: string]: boolean }>({})
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isLogo, setLogo] = useState("brother-logo.png")
  const [isLogoName, setLogoName] = useState("Brother.TS")
  const [isColorName, setColorName] = useState("px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-start font-serif font-bold text-white bg-gradient-to-r from-gray-700 via-gray-800 to-gray-600 bg-animate")
  const [isOnline, setIsOnline] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [theme, setTheme] = useState('dark')
  
  const metrics = usePerformanceMonitoring()

  // Check for user preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)')
    
    setPrefersReducedMotion(mediaQuery.matches)
    setTheme(colorSchemeQuery.matches ? 'light' : 'dark')
    
    const motionHandler = (e) => setPrefersReducedMotion(e.matches)
    const themeHandler = (e) => setTheme(e.matches ? 'light' : 'dark')
    
    mediaQuery.addEventListener('change', motionHandler)
    colorSchemeQuery.addEventListener('change', themeHandler)
    
    return () => {
      mediaQuery.removeEventListener('change', motionHandler)
      colorSchemeQuery.removeEventListener('change', themeHandler)
    }
  }, [])

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Responsive design with debouncing
  useEffect(() => {
    const checkScreenSize = debounce(() => {
      setIsMobile(window.innerWidth < 768)
    }, 150)

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Enhanced logo switching with performance consideration
  useEffect(() => {
    if (prefersReducedMotion) return

    const toggleLogo = () => {
      setLogo(prev => {
        const newLogo = prev === "brother-logo.png" ? "disley.svg" : "brother-logo.png"
        
        if (newLogo === "disley.svg") {
          setLogoName("Disley")
          setColorName("px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-start font-serif font-bold text-white bg-gradient-to-r from-pink-400 via-blue-300 to-white-400 bg-animate")
        } else {
          setLogoName("Brother.TS")
          setColorName("px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-start font-serif font-bold text-white bg-gradient-to-r from-gray-700 via-gray-800 to-gray-600 bg-animate")
        }
        
        return newLogo
      })
    }

    const interval = setInterval(toggleLogo, 2500)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  // Optimized functions with useCallback
  const toggleCategory = useCallback((categoryName: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }))
  }, [])

  const openModal = useCallback((item: any) => {
    setSelectedItem(item)
    setZoomLevel(1)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedItem(null)
    setZoomLevel(1)
  }, [])

  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3))
  }, [])

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5))
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedItem) {
        switch (e.key) {
          case 'Escape':
            closeModal()
            break
          case '+':
          case '=':
            zoomIn()
            break
          case '-':
            zoomOut()
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedItem, closeModal, zoomIn, zoomOut])

  // Memoized data with better organization
  const menuCategories = useMemo(() => [
    { category: "Menu Tacos", image: "/menustuff/tacos.png", color: "orange" },
    { category: "Menu Pastas & Plats", image: "/menustuff/menupastaetplat.png", color: "red" },
    { category: "Menu Pizza(s) Sauce Blanche", image: "/menustuff/pizzawhite.png", color: "blue" },
    { category: "Menu Pizza(s) Sauce Rouge", image: "/menustuff/pizzared.png", color: "red" },
    { category: "Menu Burgers", image: "/menustuff/burgers.png", color: "yellow" },
    { category: "Menu Poutine(s)", image: "/menustuff/menupouteins.png", color: "amber" },
    { category: "Menu Gratins et Snacks", image: "/menustuff/snacksetgratins.png", color: "green" },
  ], [])

  const ourHistory = useMemo(() => [
    { category: "History", image: "/menustuff/historyofbrothers.png", color: "amber" }
  ], [])

  const disleyStuff = useMemo(() => [
    { category: "Page 1", image: "/menustuff/page_67159512319.png" },
    { category: "Page 2", image: "/menustuff/page_67159512320.png" },
    { category: "Page 3", image: "/menustuff/page_67159512321.png" },
    { category: "Page 4", image: "/menustuff/page_67159512322.png" },
    { category: "Page 5", image: "/menustuff/page_67159512323.png" },
    { category: "Page 6", image: "/menustuff/page_67159512324.png" },
  ], [])

  // Category renderer component for better performance
  const CategorySection = useCallback(({ 
    categories, 
    title, 
    titleColor, 
    hoverColor, 
    borderColor,
    keyPrefix 
  }) => (
    <div className="bg-gradient-to-b from-gray-900 to-black flex-1 rounded-t-2xl mx-2 mb-2 border-t border-gray-700/30 shadow-2xl">
      <div className="p-4 sm:p-6">
        <h2 className={`text-2xl sm:text-3xl font-serif font-bold text-center mb-8 bg-gradient-to-r ${titleColor} bg-clip-text text-transparent`}>
          {title}
        </h2>

        {categories.map((item, index) => (
          <div key={`${keyPrefix}-${index}`} className="mb-8">
            <button
              onClick={() => toggleCategory(item.image || item.category)}
              className={`w-full flex items-center justify-between text-lg sm:text-xl font-serif font-bold mb-4 text-gray-200 border-b border-gray-700/50 pb-3 hover:${hoverColor} transition-all duration-300 hover:${borderColor} min-h-[48px] touch-manipulation`}
              aria-expanded={!collapsedCategories[item.image || item.category]}
              aria-controls={`content-${keyPrefix}-${index}`}
            >
              <span className="text-left">{item.category}</span>
              <div className={`transition-transform duration-300 ease-in-out ${hoverColor.replace('hover:', '')} flex-shrink-0 ml-2`}>
                {collapsedCategories[item.image || item.category] ? (
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </div>
            </button>

            <div
              id={`content-${keyPrefix}-${index}`}
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                collapsedCategories[item.image || item.category] 
                  ? "max-h-0 opacity-0" 
                  : "max-h-[2000px] opacity-100"
              }`}
            >
              <div className="flex justify-center px-2">
                <button
                  onClick={() => openModal(item)}
                  className={`bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700/30 hover:${borderColor} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-full group focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-label={`View ${item.category} menu`}
                >
                  <div className="w-full relative overflow-hidden">
                    <LazyImage
                      src={item.image}
                      alt={item.category}
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 max-w-full"
                      aspectRatio="auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ), [collapsedCategories, toggleCategory, openModal])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans">
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .bg-animate {
          background-size: 200% 200%;
          animation: gradientShift ${prefersReducedMotion ? '0s' : '3s'} ease infinite;
          transition: all 0.8s ease-in-out;
        }
        
        .bg-animate:hover {
          animation-duration: ${prefersReducedMotion ? '0s' : '1.5s'};
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      
      {/* Network status indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
          <WifiOff className="inline w-4 h-4 mr-2" />
          Hors ligne - Certaines fonctionnalités peuvent être limitées
        </div>
      )}

      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black/80 text-xs text-green-400 p-2 rounded z-50">
          Load: {metrics.loadTime.toFixed(0)}ms | Renders: {metrics.renderCount}
        </div>
      )}
      
      {/* Header section */}
      <div className="p-4">
        <div className="flex gap-4 mb-6">
          {/* Logo with priority loading */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
            <LazyImage
              src={isLogo}
              alt="Restaurant Logo"
              className="w-full h-full object-contain rounded-full bg-white p-1 shadow-lg transition-all duration-300"
              priority={true}
            />
          </div>

          {/* Restaurant info */}
          <div className="flex-1 space-y-2">
            <div className={isColorName}>
              {isLogoName}
            </div>

            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-4 sm:px-6 sm:py-5 rounded-xl text-white border border-gray-700/50 shadow-lg">
              <h2 className="font-serif font-semibold mb-3 text-orange-400 text-lg sm:text-xl">
                Contact & Infos
              </h2>
              <div className="text-sm sm:text-base space-y-2 text-gray-300 font-medium">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span>
                    0791&nbsp;990&nbsp;280 · 0793&nbsp;17&nbsp;36&nbsp;33
                    <br />
                    📞 07&nbsp;70&nbsp;86&nbsp;01&nbsp;27
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>P682+J8H, Bab Ezzouar</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>Ouvert: 11h - 02h (tous les jours)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu title */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-gray-900 to-black px-4 py-3 sm:px-6 sm:py-3 rounded-lg inline-block border border-gray-700/50 shadow-lg">
            <span className="text-white font-serif font-bold text-xl sm:text-2xl bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Notre Menus
            </span>
          </div>
        </div>
      </div>

      {/* Main Menu Section */}
      <CategorySection
        categories={menuCategories}
        title="Menu"
        titleColor="from-red-400 via-orange-400 to-red-500"
        hoverColor="text-orange-400"
        borderColor="border-orange-400/50"
        keyPrefix="menu"
      />

      {/* Disley Menu Section */}
      <CategorySection
        categories={disleyStuff}
        title="Disley Menus"
        titleColor="from-blue-500 via-pink-400 to-white-100"
        hoverColor="text-pink-400"
        borderColor="border-pink-400/50"
        keyPrefix="disley"
      />

      {/* Histoire Section */}
      <CategorySection
        categories={ourHistory}
        title="Notre Histoire"
        titleColor="from-amber-400 via-yellow-500 to-orange-500"
        hoverColor="text-amber-400"
        borderColor="border-amber-400/50"
        keyPrefix="history"
      />

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-700/30 mx-4">
        <div className="text-center text-gray-400 text-sm">
          <p className="mb-2">© 2025 Brother.TS Restaurant. Tous droits réservés.</p>
          <p className="text-xs">Développé avec ❤️ pour une expérience culinaire exceptionnelle</p>
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-gray-900/90 backdrop-blur-sm rounded-full p-3 hover:bg-gray-800/90 transition-all duration-200 border border-gray-700/50 hover:border-orange-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Fermer"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {!isMobile && (
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <button
                  onClick={zoomOut}
                  className="bg-gray-900/90 backdrop-blur-sm rounded-full p-3 hover:bg-gray-800/90 transition-all duration-200 border border-gray-700/50 hover:border-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={zoomLevel <= 0.5}
                  aria-label="Dézoomer"
                >
                  <ZoomOut className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={zoomIn}
                  className="bg-gray-900/90 backdrop-blur-sm rounded-full p-3 hover:bg-gray-800/90 transition-all duration-200 border border-gray-700/50 hover:border-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={zoomLevel >= 3}
                  aria-label="Zoomer"
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>
                <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-4 py-3 text-white text-sm font-medium border border-gray-700/50">
                  {Math.round(zoomLevel * 100)}%
                </div>
              </div>
            )}

            <div className="overflow-auto w-full h-full flex items-center justify-center p-16">
              <LazyImage
                src={selectedItem.image}
                alt={selectedItem.category}
                className="transition-transform duration-200 ease-in-out cursor-move rounded-lg shadow-2xl max-w-full max-h-full object-contain"
                style={{
                  transform: isMobile ? "scale(1)" : `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                }}
                priority={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
