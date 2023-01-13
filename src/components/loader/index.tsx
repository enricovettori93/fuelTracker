interface LoaderProps {
  className?: string
}
const Loader = ({className = "w-6 h-6 border-white"}: LoaderProps) => {
  return (
    <div className={`rounded-full animate-spin border border-solid border-t-transparent ${className}`}></div>
  )
}

export default Loader;