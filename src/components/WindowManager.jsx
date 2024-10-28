import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { X, Minus, Square, ChevronDown } from 'lucide-react';

export function WindowManager({ windows, setWindows }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [activeWindow, setActiveWindow] = useState(null);
  const [touchStartPos, setTouchStartPos] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, minimized: true } : w
    ));
  };

  const maximizeWindow = (id) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, maximized: !w.maximized } : w
    ));
  };

  const bringToFront = (id) => {
    setActiveWindow(id);
    setWindows(prev => {
      const window = prev.find(w => w.id === id);
      const others = prev.filter(w => w.id !== id);
      return [...others, window];
    });
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e, handler) => {
    if (!touchStartPos) return;

    const touch = e.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - touchStartPos.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.y);

    if (deltaX < 10 && deltaY < 10) {
      handler();
    }
    setTouchStartPos(null);
  };

  const handleControlClick = (e, handler) => {
    e.stopPropagation();
    handler();
  };

  return (
    <>
      {windows.map(window => {
        if (window.minimized) return null;

        const isMaximized = isMobile || window.maximized;
        const zIndex = window.id === activeWindow ? 50 : 10;

        return (
          <Rnd
            key={window.id}
            default={{
              x: window.x || 10,
              y: window.y || 10,
              width: window.width || '80%',
              height: window.height || '60%'
            }}
            position={isMaximized ? { x: 0, y: 0 } : { x: window.x, y: window.y }}
            size={isMaximized ? 
              { width: '100%', height: '100%' } : 
              { width: window.width, height: window.height }
            }
            style={{ zIndex }}
            minWidth={300}
            minHeight={200}
            bounds="parent"
            dragHandleClassName="window-drag-handle"
            enableResizing={!isMaximized}
            disableDragging={isMaximized}
            onDragStart={() => bringToFront(window.id)}
            onDragStop={(e, d) => {
              setWindows(prev => prev.map(w =>
                w.id === window.id ? { ...w, x: d.x, y: d.y } : w
              ));
            }}
          >
            <div 
              className={`
                flex flex-col h-full bg-gray-800 rounded-lg shadow-xl border border-gray-700
                ${window.id === activeWindow ? 'ring-2 ring-blue-500/50' : ''}
              `}
              onClick={() => bringToFront(window.id)}
            >
              <div className="window-drag-handle flex items-center h-12 px-4 bg-gray-900 rounded-t-lg select-none">
                <div className="flex-1 text-white font-medium truncate">
                  {window.title}
                </div>
                <div className="flex items-center gap-1">
                  {isMobile ? (
                    <button
                      onTouchStart={handleTouchStart}
                      onTouchEnd={(e) => handleTouchEnd(e, () => minimizeWindow(window.id))}
                      onClick={(e) => handleControlClick(e, () => minimizeWindow(window.id))}
                      className="relative flex items-center justify-center w-12 h-12 hover:bg-gray-700/50 active:bg-gray-700 rounded-lg transition-colors group touch-manipulation"
                      aria-label="Minimize"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ChevronDown className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                      </div>
                    </button>
                  ) : (
                    <>
                      <button
                        onTouchStart={handleTouchStart}
                        onTouchEnd={(e) => handleTouchEnd(e, () => minimizeWindow(window.id))}
                        onClick={(e) => handleControlClick(e, () => minimizeWindow(window.id))}
                        className="relative flex items-center justify-center w-10 h-10 hover:bg-gray-700/50 active:bg-gray-700 rounded-lg transition-colors group touch-manipulation"
                        aria-label="Minimize"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Minus className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                        </div>
                      </button>
                      <button
                        onTouchStart={handleTouchStart}
                        onTouchEnd={(e) => handleTouchEnd(e, () => maximizeWindow(window.id))}
                        onClick={(e) => handleControlClick(e, () => maximizeWindow(window.id))}
                        className="relative flex items-center justify-center w-10 h-10 hover:bg-gray-700/50 active:bg-gray-700 rounded-lg transition-colors group touch-manipulation"
                        aria-label="Maximize"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Square className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                        </div>
                      </button>
                    </>
                  )}
                  <button
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => closeWindow(window.id))}
                    onClick={(e) => handleControlClick(e, () => closeWindow(window.id))}
                    className={`
                      relative flex items-center justify-center
                      ${isMobile ? 'w-12 h-12' : 'w-10 h-10'}
                      hover:bg-red-500 active:bg-red-600
                      rounded-lg transition-colors group touch-manipulation
                    `}
                    aria-label="Close"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <X className={`
                        text-gray-300 group-hover:text-white transition-colors
                        ${isMobile ? 'w-6 h-6' : 'w-4 h-4'}
                      `} />
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                {window.content}
              </div>
            </div>
          </Rnd>
        );
      })}
    </>
  );
}