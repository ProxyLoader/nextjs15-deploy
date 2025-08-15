"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react"

export default function RestaurantApp() {
  const [collapsedCategories, setCollapsedCategories] = useState<{ [key: string]: boolean }>({})
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  let [isLogo, setLogo] = useState("brother-logo.png");
  let [isLogoName, setLogoName] = useState("Brother.TS")
  let [isColorName, setColorName] = useState("brother");



  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }



    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

      useEffect(() => {






      const checkisLogo = () => {
        if(isLogo === "brother-logo.png"){
          console.log("It happened:!!!!")
          console.log(isLogo);
            setLogo("disley.svg");
            setLogoName("Disley")
            isLogo = "Disley"
            isLogo = "disley.svg";
             setColorName("px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-start font-serif font-bold text-white bg-gradient-to-r from-pink-400 via-blue-300 to-white-400 bg-animate");
        isColorName = "px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-start font-serif font-bold text-white bg-gradient-to-r from-pink-400 via-blue-300 to-white-400 bg-animate";

          return true;
        } else {
            console.log("It didn't happened:!!!! shoud reset back to brother logo! eastereggs i guess")
            setLogo("brother-logo.png");
            isLogo = "brother-logo.png";

            setLogoName("Brother.TS")
            isLogoName = "Brother.TS"

              setColorName("px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-start font-serif font-bold text-white bg-gradient-to-r from-gray-700 via-gray-800 to-gray-600 bg-animate");
              isColorName = "px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-start font-serif font-bold text-white bg-gradient-to-r from-gray-700 via-gray-800 to-gray-600 bg-animate";

          return false;
        }
      }


      setInterval(() => {
              checkisLogo();
      }, 2500)
    }, [])

  const toggleCategory = (categoryName: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }))
  }

  const openModal = (item: any) => {
    setSelectedItem(item)
    setZoomLevel(1)
  }

  const closeModal = () => {
    setSelectedItem(null)
    setZoomLevel(1)
  }

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3))
  }

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 0.5))
  }

  const menuCategories = [
    {
      category: "Menu Tacos",
      image: "/menustuff/tacos.png",
    },
    {
      category: "Menu Pastas & Plats",
      image: "/menustuff/menupastaetplat.png",
    },
    {
      category: "Menu Pizza(s) Sauce Blanche",
      image: "/menustuff/pizzawhite.png",
    },
        {
      category: "Menu Pizza(s) Sauce Rouge",
      image: "/menustuff/pizzared.png",
    },
    {
      category: "Menu Burgers",
      image: "/menustuff/burgers.png",
    },
    {
      category: "Menu Poutine(s)",
      image: "/menustuff/menupouteins.png",
    },
    {
      category: "Menu Gratins et Snacks",
      image: "/menustuff/snacksetgratins.png",
    },
  ]


  const ourHistory = [
    {
    category: "History",
    image: "/menustuff/historyofbrothers.png"

    }
  ]

  const disleyStuff = [

        {
      category: "DisplayFirst",
      image: "/menustuff/page_67159512319.png",
    },
    {
      category: "2",
      image: "/menustuff/page_67159512320.png",
    },
            {
      category: "DisplayFirst",
      image: "/menustuff/page_67159512321.png",
    },
            {
      category: "DisplayFirst",
      image: "/menustuff/page_67159512322.png",
    },

       {
      category: "DisplayFirst",
      image: "/menustuff/page_67159512323.png",
    },

       {
      category: "DisplayFirst",
      image: "/menustuff/page_67159512324.png",
    },

    ]
  
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
          animation: gradientShift 3s ease infinite;
          transition: all 0.8s ease-in-out;
        }
        
        .bg-animate:hover {
          animation-duration: 1.5s;
        }
      `}</style>
      
      {/* Header section */}
      <div className="p-4">
        <div className="flex gap-4 mb-6">
          {/* Logo */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
            <img
              src={isLogo}
              alt="Brother.TS Restaurant Logo"
              className="w-full h-full object-contain rounded-full bg-white p-1 shadow-lg"
              loading="lazy"
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
      <span className="text-orange-400 text-lg">📱</span>
      <span>
        0791&nbsp;990&nbsp;280 · 0793&nbsp;17&nbsp;36&nbsp;33
        <br />
        📞 07&nbsp;70&nbsp;86&nbsp;01&nbsp;27
      </span>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-orange-400 text-lg">📍</span>
      <span>P682+J8H, Bab Ezzouar</span>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-orange-400 text-lg">🕒</span>
      <span>Ouvert: 11h - 22h (tous les jours)</span>
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

      <div className="bg-gradient-to-b from-gray-900 to-black flex-1 rounded-t-2xl mx-2 mb-2 border-t border-gray-700/30 shadow-2xl">
        <div className="p-4 sm:p-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center mb-8 bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
            Menu
          </h2>

          {menuCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <button
                onClick={() => toggleCategory(category.category)}
                className="w-full flex items-center justify-between text-lg sm:text-xl font-serif font-bold mb-4 text-gray-200 border-b border-gray-700/50 pb-3 hover:text-orange-400 transition-all duration-300 hover:border-orange-400/50 min-h-[48px] touch-manipulation"
              >
                <span className="text-left">{category.category}</span>
                <div className="transition-transform duration-300 ease-in-out text-orange-400 flex-shrink-0 ml-2">
                  {collapsedCategories[category.category] ? (
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  collapsedCategories[category.category] ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"
                }`}
              >
                <div className="flex justify-center px-2">
                  <button
                    onClick={() => openModal(category)}
                    className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-full group"
                  >
                    <div className="w-full relative overflow-hidden">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.category}
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 max-w-full"
                        style={{ aspectRatio: "auto" }}
                        loading="lazy"
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



      <div className="bg-gradient-to-b from-gray-900 to-black flex-1 rounded-t-2xl mx-2 mb-2 border-t border-gray-700/30 shadow-2xl">
        <div className="p-4 sm:p-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center mb-8 bg-gradient-to-r from-blue-500 via-pink-400 to-white-100 bg-clip-text text-transparent">
            Disley Menus
          </h2>

          {disleyStuff.map((images, imagesIndex) => (
            <div key={imagesIndex} className="mb-8">
              <button
                onClick={() => toggleCategory(images.image)}
                className="w-full flex items-center justify-between text-lg sm:text-xl font-serif font-bold mb-4 text-gray-200 border-b border-gray-700/50 pb-3 hover:text-pink-400 transition-all duration-300 hover:border-blue-400/50 min-h-[48px] touch-manipulation"
              >
                <div className="transition-transform duration-300 ease-in-out text-pink-400 flex-shrink-0 ml-2">
                  {collapsedCategories[images.image] ? (
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  collapsedCategories[images.image] ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"
                }`}
              >
                <div className="flex justify-center px-2">
                  <button
                    onClick={() => openModal(images)}
                    className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-full group"
                  >
                    <div className="w-full relative overflow-hidden">
                      <img
                        src={images.image || "/placeholder.svg"}
                        alt={images.category}
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 max-w-full"
                        style={{ aspectRatio: "auto" }}
                        loading="lazy"
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

      {/* Notre Histoire Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black flex-1 rounded-t-2xl mx-2 mb-2 border-t border-gray-700/30 shadow-2xl">
        <div className="p-4 sm:p-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center mb-8 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Notre Histoire
          </h2>

          {ourHistory.map((history, historyIndex) => (
            <div key={historyIndex} className="mb-8">
              <button
                onClick={() => toggleCategory(history.category)}
                className="w-full flex items-center justify-center text-lg sm:text-xl font-serif font-bold mb-4 text-gray-200 border-b border-gray-700/50 pb-3 hover:text-amber-400 transition-all duration-300 hover:border-amber-400/50 min-h-[48px] touch-manipulation"
              >
                <div className="transition-transform duration-300 ease-in-out text-amber-400">
                  {collapsedCategories[history.category] ? (
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  collapsedCategories[history.category] ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"
                }`}
              >
                <div className="flex justify-center px-2">
                  <button
                    onClick={() => openModal(history)}
                    className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700/30 hover:border-amber-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-full group"
                  >
                    <div className="w-full relative overflow-hidden">
                      <img
                        src={history.image || "/placeholder.svg"}
                        alt={history.category}
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 max-w-full"
                        style={{ aspectRatio: "auto" }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-12 pt-8 border-t border-gray-700/30">
            <div className="text-center text-gray-400 text-sm">
              <p className="mb-2">© 2025 Brother.TS Restaurant. Tous droits réservés.</p>
              <p className="text-xs">Développé avec ❤️ pour une expérience culinaire exceptionnelle</p>
            </div>
          </div>
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-gray-900/90 backdrop-blur-sm rounded-full p-3 hover:bg-gray-800/90 transition-all duration-200 border border-gray-700/50 hover:border-orange-400/50"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {!isMobile && (
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <button
                  onClick={zoomOut}
                  className="bg-gray-900/90 backdrop-blur-sm rounded-full p-3 hover:bg-gray-800/90 transition-all duration-200 border border-gray-700/50 hover:border-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={zoomLevel <= 0.5}
                >
                  <ZoomOut className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={zoomIn}
                  className="bg-gray-900/90 backdrop-blur-sm rounded-full p-3 hover:bg-gray-800/90 transition-all duration-200 border border-gray-700/50 hover:border-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={zoomLevel >= 3}
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>
                <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-4 py-3 text-white text-sm font-medium border border-gray-700/50">
                  {Math.round(zoomLevel * 100)}%
                </div>
              </div>
            )}

            <div className="overflow-auto w-full h-full flex items-center justify-center p-16">
              <img
                src={selectedItem.image || "/placeholder.svg"}
                alt="Menu item"
                className="transition-transform duration-200 ease-in-out cursor-move rounded-lg shadow-2xl max-w-full max-h-full object-contain"
                style={{
                  transform: isMobile ? "scale(1)" : `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                }}
                draggable={false}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
