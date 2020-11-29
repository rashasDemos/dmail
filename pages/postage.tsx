import React, { useEffect, useState } from 'react'
import {NextPage} from 'next'
import { Layout } from '../components/Layout';
import { Box } from 'rebass';
import { Logo } from '../components/Logo';
import { Recepient } from '../components/Writing/Recepient';
import { Sender } from '../components/Writing/Sender';
import Image from 'next/image';
import { Transition } from 'react-transition-group';

interface writingProps {
    router: Object[];
    rec: Object[];
    sender: Object[];
    sS: ([]) => void;
    sR: ([]) => void;
}

export const postage: NextPage<writingProps> = ({router,rec,sender,sS,sR}) => {
        const [stamped, setStamped] = useState<boolean>()
    
        
function setTypeRecName(e){
    let k = [...rec];
    k[0] = e.target.value;
    sR(k)
}
      
function setTypeRecEmail(e){
    let k = [...rec];
    k[1] = e.target.value;
    sR(k)
}

function setTypeSenderName(e){
    let k = [...sender];
    k[0] = e.target.value;
    sS(k)
}
      
function setTypeSenderEmail(e){
    let k = [...sender];
    k[1] = e.target.value;
    sS(k)
}

useEffect(() => {

  
   
    const goToWriting = setTimeout(() => {
        stamped && router.push({
            pathname: '/writing',
           
            query: { send: sender, rec: rec },
          })
    },2000)
},[stamped])

        return <Transition timeout={0} in={true} appear>
            {(status) => (
                <Layout>
                <Box sx={{
                    width: '100%',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    // transform: ['translateX(80vw)','translateX(80vw)','translateX(0vw)','translateX(0vw)','translateX(0vw)']
                }}>
                    <Logo text="D-Mail" caption="Hello! First, write your name and email on the top left. Then the name and email of the person you are sending a digital mail to. Make sure everything is correctly spelled before hitting the stamp to start writing your letter. (on the top right)." />
                <Box sx={{
                    width: ['initial',1110,1110,1110,1110],
                    height: [494,494,494,494,494],
                    background: 'linear-gradient(112.3deg, #FF7878 35.46%, #FF5454 96.36%)',
                    borderRadius: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 30,
                    transform: status === 'entered' ? 'scale(1) translateY(0vh)' : 'scale(0) translateY(-100vh)',
                    transition: 'all 1s cubic-bezier(0.27, 1.15, 0.79, 1.07)'
    
    
                }}>
                  <Box sx={{
                      height: ['initial','initial','40%'],
                      display: 'flex',
                      justifyContent: ['space-between','space-between','space-between'],
                      alignItems: 'center',
                      transform: ['scale(0.8) translateX(1vw)','scale(0.8) translateX(10vw)','scale(1) translateX(0vw)'],
                      px: 40
                  }}>
      <Recepient sTRN={setTypeRecName} sTRE={setTypeRecEmail} rec={rec} sender={sender}/>
        <Box onClick={() => setStamped(true)} sx={{
          width: 100,
          height: 100,
          margin: 30,
          border: '5px solid black',
          opacity: stamped ? 1 : 0.3,
          fontSize: '0.8rem',
          p: '6px',
          cursor: 'pointer',
          transition: 'all 300ms ease-in-out 1s',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
      }}>
          <Box sx={{
              transform: stamped ? 'scale(1.0)' : 'scale(1.3)',
              opacity: stamped ? 1 : 0,
              position: 'absolute',
              transition: 'all 300ms ease-in-out 1s',
    
          }}>
            <Image src="/qr.png" width="100%" height="100%" alt="qr code" /></Box> {!stamped && 'Click To Place Stamp and Start Writing'}
      </Box>
                  </Box>
                  <Box sx={{
                      height: '60%',
                      display: 'flex',
                      justifyContent: 'center',
                  }}>
      <Sender sTSN={setTypeSenderName} sTSE={setTypeSenderEmail} rec={rec} sender={sender} />
                  </Box>
                </Box>
                </Box>
            </Layout>
            )}
        </Transition>;
}

export default postage;
