import React, { useState } from "react";
import { NextPage } from "next";
import { Layout } from "../components/Layout";
import { Box } from "rebass";
import { useRouter } from "next/router";
import Image from "next/image";
import { Logo } from "../components/Logo";
import fetch from "isomorphic-unfetch";

interface shippingProps {
  id: string;
  rec: Object[];
  sender: Object[];
  url: string;
  router: any;
}

export const shipping: NextPage<shippingProps> = ({
  id,
  rec,
  sender,
  router,
  url,
}) => {
  let d = new Date();

  async function sendLetter() {
    const j = await fetch(
      "https://us-central1-dmail-18750.cloudfunctions.net/app/api/create",
      {
        method: "POST",
        body: JSON.stringify({
          id: id,
          url: url,
          rec: sender[0],
          recEmail: sender[1],
          sender: rec[0],
          senderEmail: rec[1],
          date: d.getMonth().toString() + d.getDate().toString(),
          stype: shippingType ? 'fast' : 'slow'
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    ).then((res) => console.log(res));

    router.push({
      pathname: "/thankyou",
      query: {
        url: url,
        id: id,
      },
    });
  }

  const [shippingType, setType] = useState<boolean>();
  return (
    <Layout>
      <Logo text="d-Mail" />
      <Box
        sx={{
          width: "860px",
          height: "50vh",
          display: "flex",
          justifyContent: 'center',
          margin: '100px auto'
        }}
      >
        <Box sx={{ width: "70%", flexDirection: "column" }}>
          {/* shipping options <br />
                    transaction id: {id}<br />
                    from: {rec[0]} {`=>`} {rec[1]}<br />
                    to: {sender[0]} {`=>`} {sender[1]}<br /> */}

          {/* <Box 
                   onClick={() => sendLetter()}
                   sx={{
                     width: 200,
                     textAlign: 'center',
                     borderRadius: 5,
                     margin: 10,
                     height: 50,
                     background: 'navy',
                     color: 'white',
                     fontSize: '1.4rem',
                     fontWeight: 600,
                     p: 10,
                     ":hover": {
                       background: '#00064440',
          
                     }
                   }}>
                     Send Letter
                   </Box> */}
          <Box
            sx={{
              height: "20%",
              display: "flex",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Box
              sx={{
                px: 10,
                height: 42,
                background: "#FBFFFC80",
                borderRadius: 13,
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
              }}
            >
              Digital Shipment Options:
            </Box>
          </Box>
          <Box
            sx={{
              height: "29%",
              display: "flex",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Box
              onClick={() => setType(false)}
              sx={{
                height: 84,
                boxShadow: '2px 2px 5px #00000040',
                background: "#FBFFFC80",
                borderRadius: 13,
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "space-evenly",
                fontWeight: 800,
                border: !shippingType ? '1px solid black' : 'none'
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  mx: 30,
                  borderRadius: 20,
                  background: !shippingType ? 'gold' : 'none',
                  border: "1px solid #797979",
                  ":hover": {
                    background: "#bebebe",
                  },
                }}
              />
              <Box
                sx={{
                  mx: 30,
                  textAlign: "left",
                }}
              >
                <Box
                  sx={{
                    fontSize: "1.1rem",
                  }}
                >
                  {`Express > `}
                </Box>
                <Box>
                  {`4-6 business days && includes tracking number & support line`}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              height: "29%",
              display: "flex",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Box
            onClick={() => setType(true)}
              sx={{
                height: 84,
                background: "#FBFFFC80",
                boxShadow: '2px 2px 5px #00000040',
                borderRadius: 13,
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "space-evenly",
                fontWeight: 800,
                border: shippingType ? '1px solid black' : 'none'
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  mx: 30,
                  borderRadius: 20,
                  background: shippingType ? 'gold' : 'none',
                  border: "1px solid #797979",
                  ":hover": {
                    background: "#bebebe",
                  },
                }}
              />
              <Box
                sx={{
                  mx: 30,
                  textAlign: "left",
                }}
              >
                <Box
                  sx={{
                    fontSize: "1.1rem",
                  }}
                >
                  {`Cheetah > `}
                </Box>
                <Box>
                  {`1-2 business days && includes tracking number & support line`}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              height: "20%",
              display: "flex",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
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
              {`I, ${rec[0]}, am sending ${sender[0]} a d-letter for absolutely free.`}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            margin: "0 auto",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            py: 10,
          }}
        >
          <Box
            sx={{
              width: 150,
              height: 225,
              borderRadius: 12,
              background:
                "linear-gradient(112.3deg, #FFFDCE 35.46%, #FFECBB 96.36%)    ",
              boxShadow: "inset 4px 4px 16px rgba(0, 0, 0, 0.25)",

              display: "flex",
              flexDirection: "column",

              alignItems: "center",
              zIndex: 0,
              p: 10,
              pt: 40,
            }}
          >
            <Image src={url} width="90%" height="90%" alt="ur pic" />
          </Box>
         <Box width="100%" display="flex" sx={{
           justifyContent: 'center',
           alignItems: 'center'
         }}>
         <Box
          onClick={() => sendLetter()}
            sx={{
              px: 30,
              py: 10,
              mt: 40,
              background: "#FBFFFC80",
              boxShadow: '2px 2px 5px #00000040',
              borderRadius: 13,
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              transition: 'all 300ms ease-in-out',
              ":hover": {
                transform: 'scale(1.05)',
                cursor: 'pointer',
                background: '#fbfffc'
              }
            }}
          >
            Deliver D-Letter
          </Box>
         </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default shipping;

export async function getServerSideProps(context) {
  const { image_id, url } = context.query;
  return {
    props: {
      id: image_id,
      url: url,
    }, // will be passed to the page component as props
  };
}
