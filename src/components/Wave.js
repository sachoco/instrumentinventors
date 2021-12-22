import React, { useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce/lib'
import PropTypes from 'prop-types'

const Wave = ({
  scrollX,
  waveType
}) => {
  let wave = useRef({})
  const canvasRef = useRef({})
  const scrollXprev = useRef(0)

  /**
   * Init the canvas
   */
  useEffect(() => {
    const canvas = canvasRef.current
    const c = canvas.getContext('2d')
   
    let frameCount = 0
    let frameId
    
    // render
    const render = () => {
      frameCount++
      canvasDraw(c, frameCount)
      frameId = window.requestAnimationFrame(render)
    }
    resizeCanvas()
    render()

    // unmount => stop animation
    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  /**
   * React to scrollX changes coming from the carousel
   */
  useEffect(() => {
    let delta = Math.abs(scrollX - scrollXprev.current)
    wave.current.amplitudeCurrent += wave.current.amplitudeCurrent*0.1 + delta*0.05
    // console.log(amplitude, wave.amplitude)

    if (wave.current.amplitudeCurrent >= wave.current.amplitude) wave.current.amplitudeCurrent = wave.current.amplitude
    else if (wave.current.amplitudeCurrent <= 0) wave.current.amplitudeCurrent = 0 

    scrollXprev.current = scrollX
    wave.current.period = 10 + delta * 3
  }, [scrollX])


  /**
   * Resizing listener
   */
  const resizeHandler = useDebouncedCallback(() => {
    resizeCanvas()
  }, 200)

  useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [resizeHandler])

  const resizeCanvas = () => {

    const canvas = canvasRef.current
    const { width, height } = canvas.getBoundingClientRect()
    
    canvas.width = width
    canvas.height = height

    wave.current = initWave(canvas.width)
  }


  /**
   * Wave
   * it has 3 methods:
   * initWave, updateWave, drawWave
   */
  function initWave(width) {
    let waveConf = {
      type: waveType,
      moving: true,
      xspacing: 1, // Distance between each horizontal location
      w: width, // Width of entire wave
      theta: 0.0, // Start angle at 0
      amplitude: 10.0, // Height of wave
      period: 150.0, // How many pixels before the wave repeats
      dx: 0.2, // Value for incrementing x
      yvalues: null, // Using an array to store height values for the wave
      amplitudeCurrent: 0,
      periodCurrent: 0
    }
    waveConf.yvalues = new Array(Math.floor(waveConf.w / waveConf.xspacing))
   
    return waveConf;
  }

  function updateWave() {
    wave.current.dx = Math.PI * 2 / wave.current.period

    if (wave.current.moving) wave.current.theta += 0.2;
     // For every x value, calculate a y value with sine function
    let x = wave.current.theta;
    for (let i = 0; i < wave.current.yvalues.length; i++) {
      
      if (wave.current.type === 'square') {
        wave.current.yvalues[i] = Math.sin(x) >= 0 ? wave.current.amplitudeCurrent : -wave.current.amplitudeCurrent
      } else if (wave.current.type === 'noise') {
        wave.current.yvalues[i] = wave.current.amplitudeCurrent * Math.random() - wave.current.amplitudeCurrent / 2
      } else if (wave.current.type === 'sawtooth') {
        wave.current.yvalues[i] = wave.current.amplitudeCurrent - x % wave.current.amplitudeCurrent * 2
      } else {
        wave.current.yvalues[i] = Math.sin(x) * wave.current.amplitudeCurrent;
      }      

      x += wave.current.dx;
    }

    wave.current.amplitudeCurrent -= 0.2 * wave.current.amplitudeCurrent
    if (wave.current.amplitudeCurrent <= 0) wave.current.amplitudeCurrent = 0

  }

  function drawWave(c) {
    c.beginPath();
    c.lineWidth = 2;
    c.lineCap = "butt";
  
    for (let x = 0; x < wave.current.yvalues.length; x++) {
      if (x === 0) {
        c.moveTo(0, c.canvas.height / 2 + wave.current.yvalues[x]);
      } else {
        c.lineTo(x * wave.current.xspacing, c.canvas.height / 2 + wave.current.yvalues[x]);
      }
    }
    c.stroke();
  }

 
  const canvasDraw = (c, frameCount) => {
    c.clearRect(0,0, c.canvas.width, c.canvas.height);
     
    updateWave()
    drawWave(c)
  }
  
  return (
    <div className="wave relative flex-grow w-full">
      <canvas ref={canvasRef} className="w-full h-8" />
      {/* <div className="debug">
        <div className="title">Debug</div>
        <div className="values">
          { wave && <div>
            <div>wave type: {wave.current.type}</div>
            <div>scrollX current: {scrollX}</div>
            <div>scrollX prev: {scrollXprev.current}</div>
            <div>amplitude: {wave.current.amplitudeCurrent < 0.1 ? 0 : wave.current.amplitudeCurrent}</div>
          </div>
          }
        </div>
      </div> */}
    </div>
  )
}

Wave.propTypes = {
  /**
   * scrollX
   */
  scrollX: PropTypes.number.isRequired,

  /**
   * Wave type
   */
  waveType: PropTypes.oneOf(['sine', 'square', 'sawtooth', 'noise'])
}

Wave.defaultProps = {
  waveType: 'sine'
}

export default Wave
