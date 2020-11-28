import React, { useEffect } from 'react'
import {NextPage} from 'next'
import { Layout } from '../components/Layout';
import { Logo } from '../components/Logo';
import { Notepad } from '../components/Writing/Notepad';

interface writingProps {
    router: any;
    rec: Object[];
    sender: Object[];
}

export const writing: NextPage<writingProps> = ({router, rec, sender}) => {
    useEffect(() => {
        console.log(router)
    },[])
        return <Layout>
            <Logo text="D-Mail" caption={`Hello ${rec[0]}, you are currently writing a letter to ${sender[0]} @ ${sender[1]}. You can use the red toolbar on the left to use a stamp text tool or a paint brush. Click the third icon to open the settings panel to be able to customize your letter.`}/>
            <Notepad router={router} rec={rec} send={sender} />
            
        </Layout>;
}

export default writing;