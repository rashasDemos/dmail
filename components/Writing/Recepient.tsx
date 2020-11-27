import React from "react";
import { NextPage } from "next";
import { Box } from "rebass";
import { Input } from "@rebass/forms";

interface RecepientProps {
    sTRN: (e: any) => void;
    sTRE: (e: any) => void;
    rec: Object[];
    sender: Object[];
}

export const Recepient: NextPage<RecepientProps> = ({sTRN,sTRE,rec,sender}) => {
  return (
    <Box
      sx={{

        padding: 30,
        
      }}
    >
      <input onChange={(e) => sTRN(e)} style={{
          background: 'none',
          boxShadow: 'none',
          outline: 'none',
          border: 'none',
          borderBottom: '1px solid black',
          fontSize: 30,
          fontFamily: 'Inika'
      }} id="name" name="name" value={rec && rec[0] + ""} defaultValue="Jose Ramirez" />
      <input onChange={(e) => sTRE(e)} style={{
          background: 'none',
          boxShadow: 'none',
          outline: 'none',
        display: 'block',
          border: 'none',
          borderBottom: '1px solid black',
          opacity: 0.5,
          fontSize: 30,
          fontFamily: 'Inika'
      }} id="name" name="name" value={rec && rec[1] + ""}  defaultValue="jram@email.com" />
    </Box>
  );
};
