import React from "react";

interface FullScreenOverlayProps {
  children: React.ReactNode
  className?: string
}

const FullScreenOverlay = ({children, className = ""}: FullScreenOverlayProps) => {
  return (
    <div className={`fullScreenOverlay fixed inset-0 bg-gray-300 bg-opacity-50 z-40 ${className}`}>
      {children}
    </div>
  )
}

export default FullScreenOverlay;