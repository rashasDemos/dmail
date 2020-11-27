import React from 'react'
import {NextPage} from 'next'
import { Box } from 'rebass';

interface SenderProps {
    sTSN: (e: any) => void;
    sTSE: (e: any) => void;
    rec: Object[];
    sender: Object[];
}

export const Sender: NextPage<SenderProps> = ({sTSN,sTSE,rec,sender}) => {
        return <Box
        sx={{
  
          padding: 30,
        fontWeight: 400
        }}
      >
        <input onChange={(e) => sTSN(e)} style={{
            background: 'none',
            boxShadow: 'none',
            outline: 'none',
            border: 'none',
            borderBottom: '1px solid black',
            fontSize: 30,
            fontFamily: 'Inika'
        }} id="name" name="name" value={sender && sender[0] + ""} defaultValue="Jane Doe" />
        <input onChange={(e) => sTSE(e)} style={{
            background: 'none',
            boxShadow: 'none',
            outline: 'none',
          display: 'block',
            border: 'none',
            borderBottom: '1px solid black',
            opacity: 0.5,
            fontSize: 30,
            fontFamily: 'Inika'
        }} id="name" name="name" value={sender && sender[1] + ""} defaultValue="jdoe@email.com" />
      </Box>;
}