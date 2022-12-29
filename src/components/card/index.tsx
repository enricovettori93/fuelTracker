import React from "react";

interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`card p-8 bg-white rounded-3xl shadow-lg ${className}`}>
      {children}
    </div>
  )
}

export default Card;