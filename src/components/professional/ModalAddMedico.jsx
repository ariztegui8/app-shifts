import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import axios from 'axios';
import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');


const localizer = momentLocalizer(moment);


const ModalAddMedico = ({ consumirApi, obrasSociales, especialidades }) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        domicilio: '',
        pais: '',
        dni: '',
        telefono: '',
        especialidad: null,
        matricula: '',
        selectedObrasSociales: [],
        availableDates: []
    })
    console.log("Datos a enviar:", form);
    const [view, setView] = useState('week');
    const [date, setDate] = useState(new Date());
    const [file, setFile] = useState(null)

    const { nombre, apellido, email, domicilio, pais, telefono, especialidad, dni, matricula } = form


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

    const handleObraSocialChange = (selectedIds) => {
        const selectedObrasSociales = obrasSociales.filter(os => selectedIds.includes(os._id));
        setForm(prevForm => ({
            ...prevForm,
            selectedObrasSociales
        }));
    };

    const handleEspecialidadChange = (e) => {
        const selectedId = e.target.value;
        const selectedEspecialidad = especialidades.find(esp => esp._id === selectedId);
        setForm(prevForm => ({
            ...prevForm,
            especialidad: selectedEspecialidad || null
        }));
    };

    const handleSelectSlot = ({ start, end }) => {
        const title = window.prompt('Introduce un título para el nuevo horario:');
        if (title) {
            const newEvent = { start, end, title };
            setForm(prevForm => ({
                ...prevForm,
                availableDates: [...prevForm.availableDates, newEvent]
            }));
        }
    };

    const handleNavigate = newDate => {
        setDate(newDate);
    };

    const handleViewChange = newView => {
        setView(newView);
    };

    const minTime = new Date();
    minTime.setHours(7, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(21, 0, 0);


    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const formattedDates = form.availableDates.map(event => ({
            ...event,
            start: moment(event.start).format("YYYY-MM-DD HH:mm:ss"),
            end: moment(event.end).format("YYYY-MM-DD HH:mm:ss"),
            title: event.title
        }));

        const formData = new FormData()
        formData.append('nombre', form.nombre)
        formData.append('apellido', form.apellido)
        formData.append('email', form.email)
        formData.append('domicilio', form.domicilio)
        formData.append('pais', form.pais)
        formData.append('dni', form.dni)
        formData.append('telefono', form.telefono)
        formData.append('matricula', form.matricula)
        formData.append('especialidad', JSON.stringify(form.especialidad))
        formData.append('selectedObrasSociales', JSON.stringify(form.selectedObrasSociales));
        formData.append('availableDates', JSON.stringify(formattedDates))

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
                especialidad: null,
                matricula: '',
                availableDates: [],
                selectedObrasSociales: [],
            })
            setFile(null)
        } catch (error) {
            console.error('Error', error.response ? error.response.data : error.message)
        }
    }


    return (
        <div>
            <Button size="sm" color='primary' onPress={onOpen}>Agregar Medico</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop='blur'
                size='5xl'
                scrollBehavior='outside'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmitForm}>
                                <ModalHeader className="flex flex-col gap-1">Crear Professional</ModalHeader>
                                <ModalBody>
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
                                            isRequired
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
                                            isRequired
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
                                        <div>
                                            <Select
                                                label="Seleccionar Especialidad"
                                                onChange={handleEspecialidadChange}
                                                value={form.especialidad ? form.especialidad._id : ''}
                                                name='especialidad'
                                                radius="sm"
                                                size="sm"
                                                variant="bordered"
                                            >
                                                {especialidades.map(esp => (
                                                    <SelectItem key={esp._id} value={esp._id}>
                                                        {esp.nombre}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </div>
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



                                    </div>
                                    <div className='grid grid-cols-1 gap-4'>
                                        <div>
                                            <Select
                                                label="Seleccionar Obra Social"
                                                selectionMode="multiple"
                                                onChange={(e) => handleObraSocialChange(e.target.value)}
                                                value={form.selectedObrasSociales.map(os => os._id)}
                                                radius="sm"
                                                size="sm"
                                                variant="bordered"
                                            >
                                                {obrasSociales.map(os => (
                                                    <SelectItem key={os._id} value={os._id}>
                                                        {os.nombre}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </div>

                                        <div>
                                            <Calendar
                                                localizer={localizer}
                                                events={form.availableDates.map(event => ({
                                                    ...event,
                                                    start: new Date(event.start),
                                                    end: new Date(event.end)
                                                }))}
                                                date={date}
                                                onView={handleViewChange}
                                                onNavigate={handleNavigate}
                                                view={view}
                                                onSelectSlot={handleSelectSlot}
                                                selectable={true}
                                                defaultView="week"
                                                style={{ height: 500 }}
                                                min={minTime}
                                                max={maxTime}
                                                messages={{
                                                    next: "Siguiente",
                                                    previous: "Anterior",
                                                    today: "Hoy",
                                                    month: "Mes",
                                                    week: "Semana",
                                                    day: "Día",
                                                    agenda: "Agenda",
                                                    date: "Fecha",
                                                    time: "Hora",
                                                    event: "Evento",
                                                    noEventsInRange: "No hay eventos en este rango.",
                                                    showMore: total => `+ Ver más (${total})`
                                                }}
                                            />
                                        </div>
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

export default ModalAddMedico