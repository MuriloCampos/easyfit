import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react"

export default function NewProfessionalModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <span>blablabla</span>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost">Cancelar</Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Criar conta
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}