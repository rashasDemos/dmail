import React from 'react'
import Head from 'next/head'
import {NextPage} from 'next'
import { Box } from 'rebass';
import { Logo } from './Logo';

interface LayoutProps {
children: any
}

export const Layout: NextPage<LayoutProps> = ({children}) => {
        return <Box>
            <Head>
                <title>D-Mail</title>
            </Head>
           
            {children}
        </Box>;
}