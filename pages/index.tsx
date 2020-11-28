import React from "react";
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Box } from "rebass";
import { Layout } from "../components/Layout";
import { Logo } from "../components/Logo";
import { Card } from "../components/Card";
import Image from "next/image";
import Link from "next/link";
interface indexProps {
  router: Object[];
}

export const index: NextPage<indexProps> = ({ router }) => {
  return (
    <Layout>
      <Logo text="D-Mail" fontSize={144} />
      <Link href="/tracking"><a>  <Box sx={{
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: '1.3rem',
        mt: 10,
        cursor: 'pointer'
      }}>
        Track an Order
      </Box></a></Link>
      <Box
        sx={{
          width: ["80vw", "100vw", "90vw", "80vw", "80vw"],
          margin: "30px auto",
          display: "flex",
          flexDirection: ["column", "column", "row", "row", "row"],
          justifyContent: [
            "center",
            "center",
            "space-between",
            "space-between",
            "space-between",
          ],
          alignItems: "center",
        }}
      >
        <Card>
          <Box
            sx={{
              width: "40%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image src="/email.svg" alt="" width={"100%"} height={"100%"} />
          </Box>
          <Box
            sx={{
              width: "40%",
              textAlign: "center",
              fontSize: [28, 32, 16, 24, 32],
            }}
          >
            EMAIL DOESNT FEEL <b>AUTHENTIC</b>
          </Box>
        </Card>
        <Card>
          {" "}
          <Box
            sx={{
              width: "33%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image src="/mbox.svg" alt="" width={131} height={131} />
          </Box>
          <Box
            sx={{
              width: "33%",
              textAlign: "center",
              lineHeight: "90%",
              zIndex: 2,
              fontSize: [24, 24, 16, 24, 32],
            }}
          >
            BUT REAL MAIL IS{" "}
            <b style={{ fontSize: 20 }}>
              {" "}
              {`EXPENSIVE
& UNRELIABLE`}
            </b>
          </Box>
          <Box
            sx={{
              width: "33%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image src="/tear.svg" alt="" width={131} height={131} />
          </Box>
        </Card>
        <Card>
          <Box
            sx={{
              width: "40%",
              textAlign: "center",
              fontSize: [24, 32, 16, 24, 32],

              zIndex: 2,
            }}
          >
            DIGITAL MAIL FIXES <b>THAT</b>
          </Box>
          <Box
            sx={{
              width: "40%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image src="/dmail.svg" alt="" width={131} height={131} />
          </Box>
        </Card>
      </Box>
      <Box
        onClick={() => router.push("/postage")}
        sx={{
          width: "100vw",
          margin: "0 auto",
          height: '100%',
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          cursor: 'pointer',
          transition: 'all 300ms ease-in-out',
          ":hover": {
            transform: 'scale(1.05)',
            background: 'linear-gradient(0deg,#D3FFE2,#FF6A6A20,#D3FFE2)'
          }
        }}
      >
        <Box
          sx={{
            position: "absolute",
            fontSize: 24,
            fontWeight: 800,
            color: "white",
            transform: "translateY(10vh)",
            zIndex: 2,
          }}
        >
          Start Writing
        </Box>

        <Image src="/letter.svg" alt="" width="200%" height="200%" />
      </Box>
    </Layout>
  );
};

export default index;
