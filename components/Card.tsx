import React from 'react'
import {NextPage} from 'next'
import { Box } from 'rebass';

interface CardProps {
    children: any;
}

export const Card: NextPage<CardProps> = ({children}) => {
        return <Box sx={{
            width: [334,334,200,280,334],
            height: [205,205,150,205,205],
            background: '#6CB785',
            borderRadius: 18,
            boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            padding: 30,
            marginBottom: [10,10,0,0,0]
        }}>
            {children}
        </Box>;
}