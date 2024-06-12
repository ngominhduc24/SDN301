import { useLayoutEffect, useState } from "react"

export const useWindowReSize = () => {
  const [dimensions, setDimensions] = useState({
    height: global.window.innerHeight,
    width: global.window.innerWidth,
  })
  useLayoutEffect(() => {
    function handleResize() {
      setDimensions({
        height: global.window.innerHeight,
        width: global.window.innerWidth,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return dimensions
}
