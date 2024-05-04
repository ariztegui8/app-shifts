import { Button, Calendar, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import axios from 'axios';
import React, { useCallback, useState } from 'react'

const ModalAddDisponibilidad = () => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

   

    const handleSubmitForm = async (e) => {
      
    };



    return (
        <div>
            <Button size="sm" color='primary' onPress={onOpen}>Agregar disponibilidad</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop='blur'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmitForm}>
                                <ModalHeader className="flex flex-col gap-1">Agregar disponibilidad</ModalHeader>
                                <ModalBody>
                                   
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        type='submit'
                                        // htmlType='submit'
                                        color="primary"
                                    // onPress={handleSubmitForm}
                                    >
                                        Agregar
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ModalAddDisponibilidad