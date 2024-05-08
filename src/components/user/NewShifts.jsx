'use client'
import { Radio, RadioGroup, Select, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'

const NewShifts = ({ obrasSociales, professionals, especialidades }) => {

    console.log('professionals',professionals);

    const [selectedType, setSelectedType] = useState(false)

    const handleTypeChange = (type) => {
        setSelectedType(type)
    }

    return (
        <div className='flex flex-col max-w-xl m-auto justify-center border border-bg-slate-400 p-4 rounded-md'>
            <h1 className='font-bold text-3xl mb-6 text-center'>Solicitar turno online</h1>
            <p className='mb-6 text-center' >Complete los siguientes datos para solicitar su turno</p>

            <div className='mb-6'>
                <Select
                    label="Seleccionar Obra Social"
                    radius="sm"
                    size="sm"
                    variant="bordered"
                >
                    {obrasSociales && obrasSociales.map(os => (
                        <SelectItem key={os._id} value={os._id} textValue={os.nombre}>
                            {os.nombre}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <div className='mb-3'>
                <p className='mb-3'>Solicitar turno por</p>
                <RadioGroup
                    orientation="horizontal"
                >
                    <Radio
                        value="especialidad"
                        onChange={() => handleTypeChange('especialidad')}
                    >Especialidad
                    </Radio>
                    <Radio
                        value="professional"
                        onChange={() => handleTypeChange('professional')}
                    >
                        Profesional
                    </Radio>
                </RadioGroup>
            </div>

            {selectedType === 'professional' &&
                <div className='mb-3'>
                    <Select
                        label="Seleccionar Profesional"
                        radius="sm"
                        size="sm"
                        variant="bordered"
                    >
                        {professionals && professionals.map(prof => (
                            <SelectItem key={prof._id} value={prof._id} textValue={`${prof.nombre} ${prof.apellido}`}>
                                {prof.nombre} {prof.apellido}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            }

            {selectedType === 'especialidad' &&
                <div className='mb-3'>
                    <Select
                        label="Seleccionar Especialidad"
                        radius="sm"
                        size="sm"
                        variant="bordered"
                    >
                        {especialidades && especialidades.map(es => (
                            <SelectItem key={es._id} value={es._id} textValue={es.nombre}>
                                {es.nombre}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            }


        </div>
    )
}

export default NewShifts