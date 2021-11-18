import React, { useRef, useEffect, useState } from 'react'


const Circle = () => {
    const [drawing, setDrawing] = useState(false)

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const startXRef = useRef(null)
    const startYRef = useRef(null)
    const endXRef = useRef(null)
    const endYRef = useRef(null)

    


    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 2
        canvas.height = window.innerHeight * 2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`

        const ctx = canvas.getContext("2d")
        ctx.scale(2, 2)
        ctx.lineCap = "round"
        ctx.strokeStyle = "black"
        ctx.fillStyle = "white"
        ctx.lineWidth = 5
        ctxRef.current = ctx
        
    }, [])
    const getMousePos = (canvas, e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        }
    }
    const handleMouseDown = (event) => {
        const pos = getMousePos(canvasRef.current, event)
        ctxRef.current.beginPath()
        ctxRef.current.moveTo(pos.x, pos.y)
        const startX = pos.x
        const startY = pos.y
        startXRef.current = startX
        startYRef.current = startY
        setDrawing(true)

    }

    const handleMouseMove = (event) => {
        if(!drawing) {
            return
        }
        // console.log(event.clientX, event.clientY)
    }

    const handleMouseUp = (event) => {
        const pos = getMousePos(canvasRef.current, event)
        const endX = pos.x
        const endY = pos.y
        endXRef.current = endX
        endYRef.current = endY
        // const xCoord = endXRef.current - startXRef.current
        // const yCoord = endYRef.current - startYRef.current
        const radius = Math.sqrt(Math.pow((startXRef.current - endXRef.current), 2) + Math.pow((startYRef.current - endYRef.current), 2))
        console.log(radius)
        ctxRef.current.arc(startXRef.current, startYRef.current, radius, 0, 2 * Math.PI)
        ctxRef.current.stroke()
        ctxRef.current.fill()

        ctxRef.current.closePath()
        setDrawing(false)
    }

    return (
            <canvas id="canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={canvasRef}
            
            >
            Paint
        </canvas>

)
}

export default Circle