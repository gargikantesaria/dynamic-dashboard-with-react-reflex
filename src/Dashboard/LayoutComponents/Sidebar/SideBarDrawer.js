import { Box } from '@chakra-ui/react'
import React from 'react'

export default function SideBarDrawer({children,...props}) {
  return (<>
     {props.displaySidebar? <Box px={6} py={6} border={"1px"} backdropBlur={"23px"} borderColor={"gray.stroke"} h={'100%'} borderRadius='11px' bg='gray.glass' w='346px' position={"absolute"} top="0px" right={"60px"}>
          {children}
      </Box>:<></>}
      </>
  )
}
