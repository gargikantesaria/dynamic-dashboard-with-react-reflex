import { Box,  Divider, Text } from '@chakra-ui/react'
import React from 'react'

export default function News() {
    const newsData = [
        {
            headlines: "Crypto Analytics Firem Messari Cuts 15% of Workforce as part of Restructurnig",
            description: "The crypto intelligence firm, which is led by Ryan Selkis, had closed a $35 million Series B fundraising round last year.",
            date:"Feb 23, 1:43 PM"
        },
        {
            headlines: "Coinbase Launches Layer 2 Blockchain Base to Provide Onramp ",
            description: "Base is built on Optimism and Coinbase has no plans to issue a new network token.",
            date:"Feb 23, 1:43 PM"
        },
        {
            headlines: "SEC Objects to Binance.US’ $1B Voyager Deal, Alleging Sale of Unregistered Securities",
            description: "The crypto intelligence firm, which is led by Ryan Selkis, had closed a $35 million Series B fundraising round last year.",
            date:"Feb 23, 1:43 PM"
        },
        {
            headlines: "First Mover Americas: Cathie Wood Doubles Down on Coinbase",
            description: "The crypto intelligence firm, which is led by Ryan Selkis, had closed a $35 million Series B fundraising round last year.",
            date:"Feb 23, 1:43 PM"
        },
        {
            headlines: "Coinbase Launches Layer 2 Blockchain Base to Provide Onramp ",
            description: "Base is built on Optimism and Coinbase has no plans to issue a new network token.",
            date:"Feb 23, 1:43 PM"
        },
        {
            headlines: "SEC Objects to Binance.US’ $1B Voyager Deal, Alleging Sale of Unregistered Securities",
            description: "The crypto intelligence firm, which is led by Ryan Selkis, had closed a $35 million Series B fundraising round last year.",
            date:"Feb 23, 1:43 PM"
        },
        {
            headlines: "SEC Objects to Binance.US’ $1B Voyager Deal, Alleging Sale of Unregistered Securities",
            description: "The crypto intelligence firm, which is led by Ryan Selkis, had closed a $35 million Series B fundraising round last year.",
            date:"Feb 23, 1:43 PM"
        },
    ]
  return (
      <Box  h={'100%'}>
          <Text fontWeight={"semibold"} size={"14px"} pb={"8px"}>News</Text>
          <Divider borderWidth='1px' color={"gray.stroke"} />    
          <Box  h={'100%'} overflow={'hidden'}>
          <Box h={'95%'} className='news' overflowY={'scroll'}  my={'24px'}>
              {newsData.map((news => (
                 <Box cursor={'pointer'} bg='white.100' borderRadius={'6px'} py='16px' px='20px' mb='8px' mx={"auto"} minH={'136px'} w={'294px'}>
                      <Text pb='12px' fontSize={'12px'} fontWeight={"semibold"}>{news.headlines}</Text>
                      <Text pb='12px' fontSize={'8px'}>{news.description}</Text>
                      <Text fontSize={'8px'} fontWeight={"medium"}>{news.date}</Text>
             </Box>
             )))} 
              
              </Box>
              </Box>
    </Box>
  )
}
