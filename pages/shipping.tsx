import React from 'react'
import {NextPage} from 'next'
import { Layout } from '../components/Layout'
import { Box } from 'rebass'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Logo } from '../components/Logo'

interface shippingProps {
    id: string;
    rec: Object[];
    sender: Object[];
    url: string;
}

export const shipping: NextPage<shippingProps> = ({id, rec, sender, url}) => {
    console.log(id)
        return <Layout>
            <Logo text="write another letter?" />
            <Box>
                <Box>
                    shipping options <br />
                    transaction id: {id}<br />
                    from: {rec[0]} {`=>`} {rec[1]}<br />
                    to: {sender[0]} {`=>`} {sender[1]}<br />
                   
                   

                </Box>
                <Box>
                <Box
                sx={{
                  width: 200,
                  height: 300,

                  borderRadius: 12,
                  margin: "0 auto",
                  background: 'linear-gradient(112.3deg, #FFFDCE 35.46%, #FFECBB 96.36%)    ',
                  boxShadow: "inset 4px 4px 16px rgba(0, 0, 0, 0.25)",
                  
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 0,
                
                }}
              >
                   <Image src={url} width="200px" height="300px" alt="ur pic" />
                  </Box>
                </Box>
            </Box>
        </Layout>;
}

export default shipping;

export async function getServerSideProps(context) {
  const {image_id, url} = context.query
    return {
      props: {
          id: image_id,
          url: url
      }, // will be passed to the page component as props
    }
  }