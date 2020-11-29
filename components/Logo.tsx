import React from 'react'
import {NextPage} from 'next'
import { Box } from 'rebass';
import Link from 'next/link'
import Typewriter from 'typewriter-effect';

interface LogoProps {
    fontSize?: number;
    text: string;
    caption?: string;
}

export const Logo: NextPage<LogoProps> = ({fontSize = 64, text, caption}) => {
        return <Box sx={{
            fontSize: [70,90,fontSize,fontSize,fontSize],
            fontWeight: 800,
            textAlign: 'center',
            color: '#D26161',
           
           
        }}>
           <Link href="/"><Box as="a" onClick={() => window.location.assign('https://digitalmail.club/')} sx={{
                ":hover":{
                    borderBottom: '10px solid #D26161 ',
                    borderRadius: 10,
                    cursor: 'pointer'
                }
           }}> {text}</Box></Link>



            {caption && <><br /><h6 style={{fontSize: '1rem', color: "black", width: '50%', height: '80px', margin: '20px auto'}}><Typewriter
  onInit={(typewriter) => {
    typewriter.typeString(caption)
      .callFunction(() => {
        console.log('String typed out!');
      })
      .pauseFor(2500)
      .callFunction(() => {
        console.log('All strings were deleted');
      })
      .start();
  }}
/></h6></>}
        </Box>;
}