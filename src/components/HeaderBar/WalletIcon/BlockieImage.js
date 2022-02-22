import React, { useEffect, useRef, useState } from 'react'
import { renderIcon } from '@download/blockies'

const BlockieImage = (props) => {
  const [dataUrl, setDataUrl] = useState(null)
  const canvasRef = useRef(null)

  const address = props.address;
  const diameter = props.diameter;


  useEffect(() => {
    const canvas = canvasRef.current
    renderIcon({ seed: address.toLowerCase() }, canvas)
    const updatedDataUrl = canvas.toDataURL()

    if (updatedDataUrl !== dataUrl) {
      setDataUrl(updatedDataUrl)
    }
  }, [dataUrl, address])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
      <img
        src={dataUrl}
        height={diameter}
        width={diameter}
      />
    </>
  )
}

export default BlockieImage;