import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EditProfessional = ({ setProfessionals, prof }) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [form, setForm] = useState({
        title: '',
        description: '',
        category: '',
        author: '',
        video: '',
        image: null,
    })

    useEffect(() => {
        if (prof) {
            setForm({
                title: prof.title,
                description: prof.description,
                category: prof.category,
                author: prof.author,
                video: prof.video,
                image: null,
            })
        }
    }, [prof])

    const [file, setFile] = useState(null)


    const handleChangeForm = e => {
        if (e.target.name === 'image') {
            setFile(e.target.files[0]);
        } else {
            setForm(prevForm => ({
                ...prevForm,
                [e.target.name]: e.target.value
            }));
        }
    }

    const handleSubmitForm = async (e) => {
        // e.preventDefault()

        const formData = new FormData()
        formData.append('title', form.title)
        formData.append('description', form.description)
        formData.append('category', form.category)
        formData.append('author', form.author)
        formData.append('video', form.video)
        if (file) {
            formData.append('image', file)
        }

        for (let [key, value] of formData.entries()) {
            console.log(key, value)
        }

        try {
            const response = await axios({
                method: 'put',
                url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/professional/${prof._id}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            if (response.status === 200) {
                console.log("Professional actualizado", response.data)
                setProfessionals(prevProf => prevProf.map(profes => profes._id === prof._id ? response.data : profes))
                onClose()
            } else {
                console.log("Respuesta al actualizar", response)
            }
        } catch (error) {
            console.error('Error actualizado professional', error)
        }
    }

    const handleButtonClickEdit = (e) => {
        e.stopPropagation();
        onOpen();
    }

    return (
        <div>
            <Button
                size="sm"
                color="warning"
                variant="bordered"
                onClick={handleButtonClickEdit}
            >
                Edit
            </Button>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop='blur'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmitForm}>
                                <ModalHeader className="flex flex-col gap-1">Actualizar Professional</ModalHeader>
                                <ModalBody>
                                    <div className='flex flex-col gap-4 mb-6'>
                                        <input
                                            type="file"
                                            placeholder="Agregar imagen"
                                            className="input text-[#333333] bg-[#fff] outline-none w-full border-b border-[#333333] py-2 placeholder:text-[#333333] text-sm"
                                            name='image'
                                            onChange={handleChangeForm}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Título"
                                            className="input text-[#333333] bg-[#fff] outline-none w-full border-b border-[#333333] py-2 placeholder:text-[#333333] text-sm"
                                            name='title'
                                            value={form.title}
                                            onChange={handleChangeForm}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Autor"
                                            className="input text-[#333333] bg-[#fff] outline-none w-full border-b border-[#333333] py-2 placeholder:text-[#333333] text-sm"
                                            name='author'
                                            value={form.author}
                                            onChange={handleChangeForm}
                                            required
                                        />
                                        <textarea
                                            type="text"
                                            placeholder="Descripción"
                                            className="input text-[#333333] bg-[#fff] outline-none w-full border-b border-[#333333] py-2 placeholder:text-[#333333] text-sm"
                                            name='description'
                                            value={form.description}
                                            onChange={handleChangeForm}
                                            rows={3}
                                            required
                                        >
                                        </textarea>
                                        <select
                                            className="custom-scrollbar text-[#333333] bg-[#fff] outline-none w-full border-b border-[#333333] py-2 placeholder:text-[#333333] text-sm cursor-pointer"
                                            name='category'
                                            value={form.category}
                                            onChange={handleChangeForm}
                                            required
                                        >
                                            <option value='' disabled >Selecciona una categoría</option>
                                            <option value='BLOG'>Blog</option>
                                            <option value='CONVOCATORIA ABIERTA'>Convocatoria abierta</option>
                                            <option value='OPORTUNIDAD LABORAL'>Oportunidad laboral</option>
                                            <option value='SALA DE PRENSA'>Sala de prensa</option>
                                            <option value='PROGAMA'>Programa</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="ID del video de YouTube ej: O7oxdswgr1Q"
                                            className="input text-[#333333] bg-[#fff] outline-none w-full border-b border-[#333333] py-2 placeholder:text-[#333333] text-sm"
                                            name='video'
                                            value={form.video}
                                            onChange={handleChangeForm}
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
                                        Actualizar
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

export default EditProfessional