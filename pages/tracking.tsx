import React, { useState } from 'react'
import {NextPage} from 'next'
import { Layout } from '../components/Layout';
import { Logo } from '../components/Logo';
import {Label, Input} from '@rebass/forms';
import { Box, Button } from 'rebass';

interface trackingProps {

}

export const tracking: NextPage<trackingProps> = ({}) => {
 
        const [tracking,setTracking] = useState<string>('')
        const [loading,setLoading] = useState(true)
        const [docu,setDocu] = useState<Object[]>([])
        function changeText(e){
            setTracking(e.target.value)
        } 

        const submit = async () => {

        
            const res = await fetch(`https://us-central1-dmail-18750.cloudfunctions.net/app/api/read/${tracking}`)
            const file = await res.json();
            setLoading(false);
            setDocu(file);
            
            console.log(file)
           
          }

        return <Layout>
            <Logo text="D-Mail" />
           <Box sx={{
      
               display: 'flex',
               justifyContent: 'space-evenly',
               alignItems: 'center',
               textAlign: 'center',
               minHeight: '20vh',
               flexDirection: 'column'
           }}>
           <Box>
           <Label>
                Enter Tracking ID:
            </Label>
            <Input value={tracking} onChange={(e) => changeText(e)}>
            </Input>
            
           </Box>
           <Box>
           <Button onClick={() => submit()} backgroundColor={'#D26161'} mr={2}>Track Letter</Button>
           </Box>
           {!loading && <><Box
              sx={{
                px: 10,
                height: 42,
                background: "#FBFFFC80",
                boxShadow: '2px 2px 5px #00000040',
                borderRadius: 13,
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
              }}
            >
              {
                //@ts-ignore
              `Hello, ${docu.sender}!`}
            </Box>
            <Box
              sx={{
                px: 10,
                height: 42,
                background: "#FBFFFC80",
                boxShadow: '2px 2px 5px #00000040',
                borderRadius: 13,
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
              }}
            >
              
              {
                //@ts-ignore
              docu.date && `You submitted this delivery on, ${docu.date[0] + docu.date[1] + '-' + docu.date[2] + docu.date[3]}.`}
            </Box>
            <Box
              sx={{
                px: 10,
                height: 42,
                background: "#FBFFFC80",
                boxShadow: '2px 2px 5px #00000040',
                borderRadius: 13,
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
              }}
            >
              {
                //@ts-ignore
              docu.sType === 'done' ? `This delivery has been emailed and sent!` : `Oh no, we still are working on this delivery`}
            </Box></>}
           </Box>
        </Layout>;
}

export default tracking;