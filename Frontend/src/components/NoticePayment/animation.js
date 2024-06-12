import { useState, useRef } from "react"

const Confettiful = props => {
  const containerRef = useRef(null)
  const confettiIntervalRef = useRef(null)

  const confettiColors = ["#EF2964", "#00C09D", "#2D87B0", "#48485E", "#EFFF1D"]
  const confettiAnimations = ["slow", "medium", "fast"]

  const [count, setCount] = useState(0)

  const _renderConfetti = () => {
    confettiIntervalRef.current = setInterval(() => {
      const confettiEl = document.createElement("div")
      const confettiSize = Math.floor(Math.random() * 3) + 7 + "px"
      const confettiBackground =
        confettiColors[Math.floor(Math.random() * confettiColors.length)]
      const confettiLeft =
        Math.floor(Math.random() * containerRef?.current?.offsetWidth) + "px"
      const confettiAnimation =
        confettiAnimations[
          Math.floor(Math.random() * confettiAnimations.length)
        ]

      confettiEl.classList.add(
        "confetti",
        "confetti--animation-" + confettiAnimation,
      )
      confettiEl.style.left = confettiLeft
      confettiEl.style.width = confettiSize
      confettiEl.style.height = confettiSize
      confettiEl.style.backgroundColor = confettiBackground

      confettiEl.removeTimeout = setTimeout(function () {
        confettiEl?.parentNode?.removeChild(confettiEl)
      }, 3000)

      containerRef?.current?.appendChild(confettiEl)
    }, 25)
  }

  _renderConfetti()

  return (
    <div className="js-container" ref={containerRef}>
      {props?.children}
    </div>
  )
}

export default Confettiful
