import React, { useEffect, useRef, useState } from 'react'
import {NextPage} from 'next'
import { Box } from 'rebass';
import { Label, Input,Slider } from "@rebass/forms";
import Image from 'next/image'

interface ToolbarProps {
    clearCanvas: () => void;
    undo: () => void;
    redo: any;
    width: any;
    sliderChange: (e) => void;
    setBW: any;
    bw: any;
    tool: string;
    setTool: (string) => void;
    tv: string;
    sTV: (string) => void;
}

export const Toolbar: NextPage<ToolbarProps> = ({clearCanvas,undo,redo,width,sliderChange,setBW,bw, setTool, tool, tv,sTV}) => {
    const [more,setMore] = useState<boolean>()
    const [rot ,setRot] = useState<boolean>()
    useEffect(() => {
      document.onscroll = scrollCheck
    },)

    function scrollCheck(e) {
      e = e || window.event
      console.log(e)
      e.target.scrollingElement.scrollTop > 50 ? setRot(true) : setRot(false)
    }
    function changeText(e){
        sTV(e.target.value)
    }


        return <Box width="251px" backgroundColor="#D26161" sx={{
            borderRadius: '0px 0px 8px 8px',
            padding: 10,
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 10,
            color: "white",
            transform: rot ? more ? 'rotate(0deg) translateY(0.5vh) translateX(0.5vh)' : 'rotate(-90deg) translateY(-14.5vh) translateX(-16.5vh)' : '',
            transition: 'all 300ms ease-in-out 200ms'
           
        }}>
            <Box width="100%" height="100%" display="flex" sx={{
                justifyContent: 'space-evenly'
            }}>
             <Box opacity={tool === 'text' ? 1 : 0.4}><Image onClick={() => setTool('text')}   src="/font.svg" width="22px" height="24px" alt="text selector" /></Box>
             <Box opacity={tool === 'brush' ? 1 : 0.4}><Image onClick={() => setTool('brush')}   src="/brush.svg" width="22px" height="24px" alt="brush selector" /></Box>
             <Box opacity={more ? 1 : 0.4}><Image onClick={() => setMore(!more)}   src="/settings.svg" width="22px" height="24px" alt="settings selector" /></Box>
            </Box>
          {more && <> 
        <Box sx={{display: 'flex',flexDirection: 'row', justifyContent: 'center'}}>
        <Box sx={{cursor: 'pointer'}} mx={2} onClick={() => clearCanvas()}>Reset</Box>
          <Box sx={{cursor: 'pointer'}} mx={2} onClick={() => undo()}>Undo</Box>
          <Box sx={{cursor: 'pointer'}} mx={2}  onClick={() => redo()}>Redo</Box>
        </Box>
        <Box >
   
          {tool === 'brush' &&       <><Label htmlFor="percent">Brush Size <span style={{opacity:0.5, marginLeft: 10}}>{width}</span></Label>
          <Slider
            id="percent"
            name="percent"
            defaultValue={25}
            value={width}
            onChange={(e) => sliderChange(e)}
          /> </>}
          {tool === 'text' && <><Label>Text Content</Label><Input value={tv} onChange={(e) => changeText(e)}></Input></>}
        
          <Box
            display="flex"
            sx={{
              flexDirection: "row",
              justifyContent: 'space-between'
            }}
          >
            {["black", "white", "red", "green", "blue", "#FFFDCE"].map((x, i) => (
              <Box
                onClick={() => setBW(x)}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  mx: 10,
                  my: 10,
                  border: "1px solid #00000040",
                  background: x,
                  color:
                    x === "white" ? "black" : x === "#FFFDCE" ? "black" : "white",
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {bw === x && ":)"}
              </Box>
            ))}
          </Box>
        </Box></>}
        </Box>;
}