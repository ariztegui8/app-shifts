import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import React, { useState } from 'react'

const DeleteProfessional = ({setProfessionals, prof}) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const handleDeleteProfessional = async (id) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/professional/${id}`)
            setProfessionals(prevProf => prevProf.filter(profes => profes._id !== id))
            onClose()
        } catch (error) {
            console.error('Error al eliminar el professional', error)
        }
    }

    const handleDelete = () => {
        handleDeleteProfessional(prof._id)
        onClose()
    };

    const handleButtonClickDelete = (e) => { 
        e.stopPropagation();
        onOpen();
    }


    return (
        <div>
            <Button 
                size="sm" 
                color="danger" 
                variant="bordered"
                onClick={handleButtonClickDelete}
            >
            Delete
          </Button>
            {/* <Button onPress={onOpen}>Agregar Medico</Button> */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop='blur'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Eliminar artículo</ModalHeader>
                            <ModalBody>
                                <div>
                                    <p className='text-[#333333]'>¿Estás seguro de que deseas eliminar este artículo?</p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button onClick={handleDelete} color="primary" >
                                Eliminar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    )
}

export default DeleteProfessional