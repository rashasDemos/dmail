import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { Box } from "rebass";
import {Label} from '@rebass/forms';
import Image from "next/image";
import { Toolbar } from "./Toolbar";
import { addResizeListener, removeResizeListener } from 'detect-resize'

interface NotepadProps {
  thisd?: any;
  router: any;
  rec: Object[];
  send: Object[];
}

export const Notepad: NextPage<NotepadProps> = ({
  thisd,
  router,
  rec,
  send,
}) => {
  const [painting, setPainting] = useState<boolean>();
  const [ctx, setCtx] = useState<any>();
  const [mouse, setMouse] = useState([]);
  const [tool, setTool] = useState<string>("brush");
  const [history, setHistory] = useState<any>([]);
  const [dist, setDist] = useState<number>(-1);
  const [textVal, setTV] = useState<string>('Change This Text');

  useEffect(() => {
    const canvas: any = document && document.querySelector("#canvas");
    setCtx(canvas.getContext("2d"));
  }, []);

  useEffect(() => {
    document.onmousemove = mousemover;
    document.onkeydown = keyCheck;
  });

  function is_touch_device4() {
    return !!('ontouchstart' in window        // works on most browsers 
  || navigator.maxTouchPoints); 
}




  const mousemover = (e) => {
    e = e || window.event;
    let k = new Array();
    k.push({ x: e.pageX, y: e.pageY });
    setMouse(k);
  };

  const keyCheck = (e) => {
    e = e || window.event;
    switch(e.keyCode){
      case 90:
        e.ctrlKey && undo();
        e.metaKey && undo();
        return;
      case 88:
        e.ctrlKey && redo();
        e.metaKey && redo();
        return;
      case 82:
        e.ctrlKey && clearCanvas();
        e.metaKey && clearCanvas();
        return;
      case 13:
        e.shiftKey && submit();
    }
  }



  const [iW,setIW] = useState(0);
  const [iH,setIH] = useState(0);

  function turnOff() {
    setPainting(false);
    const c: any = document && document.querySelector("#canvas");
    
    ctx.beginPath();
    setDist(dist + 1)
    let cPushArray = [...history];
    cPushArray.push(c.toDataURL());
    setHistory(cPushArray);
    console.log(history);
  }

   // Assume canvas is in scope


 
  async function undo() {
   if (dist > 0) {
    const c: any = document && document.querySelector("#canvas");
    
    const canvasPic = new window.Image;
    let k = [...history]
    canvasPic.src = k[dist] + ""
    ctx.clearRect(0, 0, c.width, c.height);
    canvasPic.onload = async () => {
    ctx.drawImage(canvasPic, 0,0)  
    await setDist(dist - 1)
    }
   }
   if (dist < 1) {
     clearCanvas();
   }
  }

  useEffect(() =>
  {
    console.log(is_touch_device4())
  },[]  )
  async function redo() {
   if (dist < history.length - 1 && dist >= 0) {
    const c: any = document && document.querySelector("#canvas");
  
    const canvasPic = new window.Image;
    let k = [...history]
    canvasPic.src = k[dist] + ""
    ctx.clearRect(0, 0, c.width, c.height);
    canvasPic.onload = async () => {
    ctx.drawImage(canvasPic, 0,0)   
    await setDist(dist + 1)
    }
   }
  }

  const submit = async () => {
    const canvas: any = document && await document.querySelector("#canvas");
    const d = await canvas.toDataURL('image/png');
    const data = new FormData();
    await data.append('file',d)
    await data.append('upload_preset','letterimage')

    const res = await fetch('https://api.cloudinary.com/v1_1/dzsv9gi0l/image/upload',
    {
      method: 'POST',
      body: data
    })

    const file =await res.json();
    router.push({
      pathname: '/shipping',
      query: {
        image_id: file.asset_id,
        url: file.url
      }
    })
  }

  useEffect(() => {

    const doIt = setInterval(() => {
      window && window.innerWidth !== iW && resized();
      window && window.innerHeight !== iH && resized();
    },300)
    doIt;
  },[])


  const resized = async () => {
    const w: any = window && window.innerWidth;
    const h: any = window && window.innerHeight;
    setIH(h)
    setIW(w)
  }

  const clearCanvas = async () => {
    const canvas: any = document && document.querySelector("#canvas");
    let cPushArray = [...history];
    cPushArray.push(canvas.toDataURL());
    setHistory(cPushArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const [hoved, setHoved] = useState<boolean>();

  const sliderRef = useRef();

  useEffect(() => {
    console.log(painting);
  }, [painting]);

  function draw(e) {
    e = e || window.event;
   
    const canvas: any = document && document.querySelector("#canvas");
    const rect = canvas.getBoundingClientRect();
    let x = is_touch_device4() ? (e.touches && e.touches[0].clientX - rect.left) :  (e.clientX - rect.left);
    let y = is_touch_device4() ? (e.touches && e.touches[0].clientY - rect.top) : (e.clientY - rect.top);
    if (!painting) return;
 
    ctx.lineWidth = width > 0 ? width * Math.pow(2, 1 / width) : 2;
    ctx.lineCap = "round";
    ctx.lineTo(x,y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x,y);
  }

  function drawText(e) {
    const canvas: any = document && document.querySelector("#canvas");
    var context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    context.fillStyle = bw;
    context.font = "bold 20px Inika";
    context.fillText(textVal, e.clientX - rect.left, e.clientY - rect.top);
    setDist(dist + 1)
    let cPushArray = [...history];
    cPushArray.push(canvas.toDataURL());
    
    setHistory(cPushArray);
  }
  const [ig, setImage] = useState<HTMLImageElement>();

  const [width, setWidth] = useState<number>();
  const [bw, setBW] = useState<string>("black");
  const sliderChange = (e) => {
    e = e || window.event;
    setWidth(e.target.value);
  };

  useEffect(() => {
    const canvas: any = document && document.querySelector("#canvas");

    canvas.getContext("2d").strokeStyle = bw;
  }, [bw]);

  useEffect(() => {
    document.onscroll = painting && disableScroll
  })

  const disableScroll = (e) => {
    e = e || window.event
    painting && e.preventDefault();
  }

  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
     <Box onClick={() => submit()} sx={{
       padding: 3,
       background: '#D36060',
       mb: 3,
       borderRadius: 5,
       color: "white"
     }}>
     <Label>
      Submit Letter 
      </Label>
     </Box>
      {tool === "brush" && (
        <Box
          sx={{
            position: "absolute",
            width: width > 20 ? width * Math.pow(2, 1 / width) : 20,
            height: width > 20 ? width * Math.pow(2, 1 / width) : 20,
            borderRadius:
              width > 20 ? (width * Math.pow(2, 1 / width)) / 2 : 10,
            background: bw,
            opacity: hoved ? 1 : 0,
            top: mouse[0] && Math.round(mouse[0].y),
            left: mouse[0] && Math.round(mouse[0].x),
            zIndex: 3
          }}
        ></Box>
      )}
      <Toolbar bw={bw} clearCanvas={clearCanvas} redo={redo} width={width} undo={undo} sliderChange={sliderChange} setBW={setBW} tool={tool} setTool={setTool} tv={textVal} sTV={setTV} />
      <Box
        sx={{
          width: iW - 30,
          height: iH * 1.5,
          borderRadius: 12,
          margin: "0 auto",
          background: 'linear-gradient(112.3deg, #FFFDCE 35.46%, #FFECBB 96.36%)    ',
          boxShadow: "inset 4px 4px 16px rgba(0, 0, 0, 0.25)",
          pt: 50,
          px: 30,
          pb: 30,
          mb: 100,
          display: "flex",
          flexDirection: "column",
         
          alignItems: "center",
          zIndex: 0
        }}
      >
         <Box sx={{transform: `translateY(${iW/35}vh)`, zIndex: 3, position: "absolute"}}>
         <Image id="ok" src="/lines.svg" width={typeof window !== 'undefined' ? window.innerWidth + 200 : 0} height="852px" alt="lines" />
         
         </Box>
        <Box
          sx={{
            height: 100,
            opacity: 0.5,
          }}
        >
          {/* @ts-ignore */}
          {send[0][0].toUpperCase() + send[0].substr(1, send[0].length - 1)}.
          This letter was sent to you by {/* @ts-ignore */}
          {rec[0][0].toUpperCase() + rec[0].substr(1, rec[0].length - 1)} using
          Digital Mail. Click here for more information. 
        </Box>
        <Box
          sx={{
            width: "400px",
            border: "1px dashed #00000040",
          }}
        ></Box>
       
        
        <canvas
          onMouseEnter={() => tool === "brush" && setHoved(true)}
 
          onMouseLeave={() => tool === "brush" && setHoved(false)}

          onMouseDown={() => tool === "brush" && setPainting(true)}
          onTouchStart={() => tool === 'brush' && (setPainting(true))}
          
          onMouseUp={() => tool === "brush" && turnOff()}
          onTouchEnd={() => tool === 'brush' && turnOff()}

          onMouseMove={(e) => tool === "brush" && draw(e)}
          onTouchMove={(e) => tool === 'brush' && draw(e)}

          onClick={(e) => tool === "text" && drawText(e)}
          id="canvas"
          width={iW - 30}
          height={iH  * 1.5}
          style={{
            boxSizing: "border-box",
            cursor: tool === "brush" ? "none" : tool === "text" && "text",
            zIndex: 5,
            touchAction: 'none'
           
          }}
        ></canvas>
       
      </Box>
    </Box>
  );
};
