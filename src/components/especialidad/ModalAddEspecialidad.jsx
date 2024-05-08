import { Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import axios from 'axios';
import React, { useState } from 'react'

const ModalAddEspecialidad = ({consumirApiEspecialidad}) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [nombre, setNombre] = useState('');

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/especialidad`, {
                nombre
            });
            console.log('response', response.data);
            if (response.data) {
                onClose();
                setNombre('');
                consumirApiEspecialidad()
                // Agregar mensaje de éxito
            }
        } catch (error) {
            console.error('Error', error.response ? error.response.data : error.message);
            // Agregar mensaje de error
        }
    };


    return (
        <div>
            <Button  size="sm" color='primary' onPress={onOpen}>Agregar Especialidad</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop='blur'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmitForm}>
                                <ModalHeader className="flex flex-col gap-1">Agregar Especialidad</ModalHeader>
                                <ModalBody>
                                    <div>
                                        <Input
                                            type="text"
                                            label="Nombre de especialidad"
                                            name="nombre"
                                            onChange={e => setNombre(e.target.value)}
                                            radius="sm"
                                            size="sm"
                                            variant="bordered"
                                            isRequired
                                        />
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        type='submit'
                                        color="primary"
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

export default ModalAddEspecialidad