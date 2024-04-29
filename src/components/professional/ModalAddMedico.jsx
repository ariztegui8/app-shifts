import { Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import axios from 'axios';
import React, { useState } from 'react'

const ModalAddMedico = ({ consumirApi }) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        domicilio: '',
        pais: '',
        dni: '',
        telefono: '',
        especialidad: '',
        matricula: '',
        fecha: '',
        hora: '',
        obraSocial: '',
    })
    const [file, setFile] = useState(null)

    const { nombre, apellido, email, domicilio, pais, telefono, especialidad, dni, matricula, fecha, hora, obraSocial } = form


    const handleChangeForm = e => {
        if (e.target.name === 'image') {
            setFile(e.target.files[0])
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmitForm = async (e) => {
        // e.preventDefault()

        const formData = new FormData()
        formData.append('nombre', form.nombre)
        formData.append('apellido', form.apellido)
        formData.append('email', form.email)
        formData.append('domicilio', form.domicilio)
        formData.append('pais', form.pais)
        formData.append('dni', form.dni)
        formData.append('telefono', form.telefono)
        formData.append('especialidad', form.especialidad)
        formData.append('matricula', form.matricula)
        formData.append('fecha', form.fecha)
        formData.append('hora', form.hora)
        formData.append('obraSocial', form.obraSocial)
        if (file) {
            formData.append('image', file)
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/professional`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log('response', response.data)
            if (response.data) {
                consumirApi();
                onClose();
            }

            setForm({
                nombre: '',
                apellido: '',
                email: '',
                domicilio: '',
                pais: '',
                dni: '',
                telefono: '',
                especialidad: '',
                matricula: '',
                fecha: '',
                hora: '',
                obraSocial: '',
            })
            setFile(null)
        } catch (error) {
            console.error('Error', error.response ? error.response.data : error.message)
        }
    }

    const fechas = [
        { value: "10:00", label: "10:00 hs" },
        { value: "11:00", label: "11:00 hs" },
        { value: "11:30", label: "11:30 hs" },
        { value: "14:00", label: "14:00 hs" },
        { value: "15:00", label: "15:00 hs" },
    ]

    const oSocial = [
        { value: "avalian", label: "avalian" },
        { value: "sancor", label: "sancor" },
        { value: "segu", label: "segu" },
        { value: "galiia", label: "galiia" },
        { value: "pere", label: "pere" },
    ]


    return (
        <div>
            <Button color='primary' onPress={onOpen}>Agregar Medico</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop='blur'
                size='2xl'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Crear Professional</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmitForm}>
                                    <div className='grid grid-cols-2 gap-4 mb-4'>
                                        <Input
                                            type="text"
                                            label="Nombre"
                                            name="nombre"
                                            value={nombre}
                                            onChange={handleChangeForm}
                                            radius="sm"
                                            size="sm"
                                            variant="bordered"
                                        />
                                        <Input
                                            type="text"
                                            label="Apellido"
                                            name="apellido"
                                            value={apellido}
                                            onChange={handleChangeForm}
                                            radius="sm"
                                            size="sm"
                                            variant="bordered"
                                        />
                                        <Input
                                            type="email"
                                            label="Email"
                                            name="email"
                                            value={email}
                                            onChange={handleChangeForm}
                                            radius="sm"
                                            size="sm"
                                            variant="bordered"
                                        />
                                        <Input
                                            type="text"
                                            label="Domicilio"
                                            name="domicilio"
                                            value={domicilio}
                                            onChange={handleChangeForm}
                                            radius="sm"
                                            size="sm"
                                            variant="bordered"
                                        />
                                        <Input
                                            type="text"
                                            label="Pais"
                                            name="pais"
                                            value={pais}
                                            onChange={handleChangeForm}
                                            radius="sm"
                                            size="sm"
                                            variant="bordered"
                                        />
                                        <Input
                                            type="number"
                                            label="DNI"
                                            name="dni"
                                            value={dni}
                                            onChange={handleChangeForm}
                                            radius="sm"
                                            size="sm"
                                            variant="bordered"
                                        />
                                        <Input
                                            type="number"
                                            label="Telefono"
                                            name="telefono"
                                            value={telefono}
                                            onChange={handleChangeForm}
                                            radius="sm"
                                            size="sm"
                                            variant="bordered"
                                        />
                                        <Input
                                            type="text"
                                            label="Especialidad"
                                            name="especialidad"
                                            value={especialidad}
                                            onChange={handleChangeForm}
                                            radius="sm"
                                            size="sm"
                                            variant="bordered"
                                        />
                                        <Input
                                            type="text"
                                            label="Matricula"
                                            name="matricula"
                                            value={matricula}
                                            onChange={handleChangeForm}
                                            radius="sm"
                                            size="sm"
                                            variant="bordered"
                                        />
                                        <Input
                                            type="file"
                                            label="Imagen"
                                            name="image"
                                            onChange={handleChangeForm}
                                            radius="sm"
                                            size="sm"
                                            variant="bordered"
                                        />
                                        <DatePicker
                                            label="Birth date"
                                            radius="sm"
                                            size="sm"
                                            variant="bordered"
                                        />
                                        <Select
                                            label="Seleccionar fecha"
                                            radius="sm"
                                            size="sm"
                                            variant="bordered"
                                        >
                                            {fechas.map((date) => (
                                                <SelectItem key={date.value} value={date.value}>
                                                    {date.label}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className='grid grid-cols-1 gap-4'>
                                        <Select
                                            label="Seleccionar Obra Social"
                                            radius="sm"
                                            size="sm"
                                            variant="bordered"
                                        >
                                            {oSocial.map((seg) => (
                                                <SelectItem key={seg.value} value={seg.value}>
                                                    {seg.label}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    type='submit'
                                    color="primary"
                                    onPress={handleSubmitForm}
                                >
                                    Agregar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ModalAddMedico