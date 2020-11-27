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
           <Link href="/"><a> {text}</a></Link>
            {caption && <><br /><h6 style={{fontSize: '1rem', color: "black"}}>{caption}</h6></>}
        </Box>;
}