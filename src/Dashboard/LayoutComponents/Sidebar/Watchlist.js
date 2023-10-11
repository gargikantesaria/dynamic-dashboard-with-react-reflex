import { Box,  Divider, Flex, Text } from '@chakra-ui/react'
import { Add } from 'iconsax-react'

export default function Watchlist() {
    const watchData = [
        {
            token: 'BTC/USD',
            price: '22,492.00',
            percentage: '2.4%',
            status:"low"
       },
        {
            token: 'ETH/USD',
            price: '1,345.00',
            percentage: '0.4%',
            status:"low"
       },
        {
            token: 'BTC/USD',
            price: '22,492.00',
            percentage: '2.4%',
            status:"low"
       },
        {
            token: 'SOL/USD',
            price: '22.42',
            percentage: '2.4%',
            status:"high"
       },
        {
            token: 'LINK/USD',
            price: '4.52',
            percentage: '4.4%',
            status:"low"
       },
        {
            token: 'ETC/USD',
            price: '292.00',
            percentage: '1.4%',
            status:"high"
       },
           ]
  return (
      <Box h={'100%'}>
          <Flex my='2px' align={"center"} justify={"space-between"}> <Text fontWeight={"semibold"} Fontsize={"14px"} pb={"8px"}>Watchlist</Text><Add cursor={"pointer"} className=""
              variant="Linear"
              size={24}/></Flex>        
          <Divider borderWidth='1px' color={"gray.stroke"} />    
          <Box   h={'100%'} overflow={'hidden'}>
              <Box  className='news' overflowY={"scroll"} fontSize={"12px"} h={'94%'}  my={'24px'}>
                  
                  {watchData.map(watch => (
                       <Flex cursor={"pointer"} mb={"12px"} py={"8px"} borderRadius={"6px"} px={"16px"} bg={'white.100'} justify={"space-between"} align="center">
                       <Text  fontWeight={"semibold"}>
                           {watch.token}
                       </Text>
                       <Box align={"center"} display={"flex"}>
                              <Text textAlign={"left"} px={'12px'} >{watch.price}</Text>
                              <Text color={watch.status === "high" ? "profit" : "red"}>{watch.percentage}</Text>
                       </Box>
                   </Flex>
                  ))}
                 
                  
                  
            </Box></Box>
    </Box>
  )
}
