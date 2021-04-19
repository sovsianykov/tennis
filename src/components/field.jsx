import React, {useEffect, useRef} from 'react'
import Ball from "./ball";
import {Button} from "@material-ui/core";

const Field = () => {
const ball = useRef(null)
  useEffect(()=>{
      // ball.current.style.color = 'red'
  },[])
  const handleClick = () => {
     let step= 0
      let str = ''
      let br = {}
      setInterval(() => {
          step+= 1
          str = step + 'px'
         ball.current.style.marginTop = str;
           br = ball.current.getBoundingClientRect()
         console.log("Top:"+br.top+", Left:"+br.left+", Right:"+br.right+", Bottom:"+br.bottom)}, 10)

  }

    return (
        <div>
            <Button variant='contained'  onClick={handleClick}>Color</Button>
            <div className="field">
              <div ref={ball}  className="ball"/>
            </div>
        </div>
    )
}

export default Field