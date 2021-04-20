import React, {useEffect, useRef, useState} from 'react'
import {Button} from "@material-ui/core";
import {fromEvent, Observable} from "rxjs";
import { map } from 'rxjs/operators'
import {observe} from "web-vitals/dist/modules/lib/observe";
const Field = () => {

    const [rocketCord, setRocketCord ] = useState({})
    const [ballCord, setBallCord ] = useState({})
const ball = useRef(null)
const field = useRef(null)
const rocket = useRef(null)

    useEffect(() =>{
        fromEvent(field.current,'click')
            .subscribe(() =>{handleClick()})

    },[])


    let coordinates = {}
    let posY =0, posX =0, stepX= 0, stepY = 0

  const handleClick = () => {
      stepX= 20
         stepY = 30
      const interval = setInterval(() => { move()
          }, 16)

      setTimeout(() => { clearInterval(interval)}, 10000);
  }
    function move() {
        coordinates = ball.current.getBoundingClientRect()
        // console.log("Top:"+coordinates.y+", Left:"+coordinates.x)
        posY+= stepY;
        posX+= stepX;
        setBallCord({x: posX, y : posY})

        if (posY > 780 || posY < 0  ) { stepY*= -1 }
        if (posX > 980 || posX < 0  ) { stepX*= -1 }
        ball.current.style.cssText = `margin-top : ${posY}px ; margin-left : ${posX}px ` ;
        stepX*= .995
        stepY*= .995


    }


 useEffect(() =>{
 const subscription = fromEvent(field.current,'mousemove')
         .pipe(
             map(e =>({
                 x: e.offsetX,
                 y: e.offsetY
             }))
         )
         .subscribe(event=>{
             rocket.current.style.cssText = `top : ${event.y-80}px; left : ${event.x -100}px`
             setRocketCord({x: event.x - 100,y: event.y - 80})

         })

     return ()=> { subscription.unsubscribe()}
 },[])

    const stream$ = new Observable((observer) =>{
        observer.next(ballCord)

    })
     stream$.subscribe(
         value =>console.log(value)
     )



    return (
        <div>
            <div className="field" ref={field}>
              <div ref={ball}  className="ball"/>
                <div className="rocket" ref={rocket}/>
            </div>
            <Button variant='contained'  color='primary' onClick={handleClick}>Go</Button>
        </div>
    )
}

export default Field
