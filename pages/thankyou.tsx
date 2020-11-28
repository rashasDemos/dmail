import React from 'react'
import {NextPage} from 'next'
import { Box } from 'rebass';
import { Layout } from '../components/Layout';
import { Logo } from '../components/Logo';

interface thankyouProps {
    rec: any;
    url: string;
    id: string;

}

export const thankyou: NextPage<thankyouProps> = ({url,rec, id}) => {
        return <Layout>
            <Logo text="send another letter?" caption={`thank you ${rec[0]}! a confirmation letter has been sent to you at ${rec[1]}. Please copy the id code written at the end of this. If you have not receieved it, please contact us with this code:`} />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 700,
                fontSize: '2rem',
                background: '#3ac899'
            }}>{id} </Box>
        </Layout>;
}

export default thankyou;

export async function getServerSideProps(context) {
    const {url, id} = context.query
      return {
        props: {
            url: url,
            id: id
        }, // will be passed to the page component as props
      }
    }