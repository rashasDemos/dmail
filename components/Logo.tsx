import React from 'react'
import {NextPage} from 'next'
import { Box } from 'rebass';
import Link from 'next/link'

interface LogoProps {
    fontSize?: number;
    text: string;
    caption?: string;
}

export const Logo: NextPage<LogoProps> = ({fontSize = 64, text, caption}) => {
        return <Box sx={{
            fontSize: fontSize,
            fontWeight: 800,
            textAlign: 'center',
            color: '#D26161',
           
           
        }}>
           <Link href="/"><Box as="a" sx={{
                ":hover":{
                    borderBottom: '10px solid #D26161 ',
                    borderRadius: 10,
                    cursor: 'pointer'
                }
           }}> {text}</Box></Link>
            {caption && <><br /><h6 style={{fontSize: '1rem', color: "black", width: '50%', margin: '20px auto'}}>{caption}</h6></>}
        </Box>;
}