import { Button, Flex,Tooltip, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Copy, Share } from 'iconsax-react'
import React,{useRef} from 'react'
import { Link } from 'react-router-dom';

export default function ShareModal({ isOpen, setIsOpen, share }) {
  const URL = `${process.env.REACT_APP_FRONTEND_URI}/share?id=${share.id}`;
  const inputRef = useRef(null);

  function handleCopy() {
    inputRef.current.select();
    document.execCommand('copy');
  }
  function handleClick() {
    window.open(URL, '_blank');
  }
  return (
    <Modal isCentered isOpen={isOpen} onClose={()=>setIsOpen(false)}>
    <ModalOverlay backdropFilter="blur(4px)" />
    <ModalContent
      maxWidth={700}
      color={"white"}
      backgroundColor={"gray.glass"}
    >
      <ModalHeader></ModalHeader>
      <ModalCloseButton />
      <ModalBody className="mt-1 mb-10">
          <Flex alignItems={"center"}> <Input
            w={'88%'}
            ref={inputRef}
          fontSize={"14px"}
          onChange={(e) => { }}
          value={URL}
            variant={"unstyled"}
          />
             <Tooltip label="Copy to clipboard">
              <Copy onClick={handleCopy} className="cursor-pointer icon" />
              </Tooltip>
          </Flex>
      </ModalBody>

      <ModalFooter
        backgroundColor={"gray.stroke"}
        className="p-4 rounded"
      >
        <Share color="#f5f5f5" className="absolute left-6" />

        {/* <Button
          color={"gray.200"}
          fontSize={"14px"}
        //    onClick={}
          variant="ghost"
          fontWeight={"light"}
        >
           Close Tab
        </Button> */}
        <Button
          fontWeight={"light"}
          fontSize={"14px"}
          backgroundColor={"blue"}
          mr={3}
          ml={1}
          onClick={handleClick}
          >
            
          Open In NewTab
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}
