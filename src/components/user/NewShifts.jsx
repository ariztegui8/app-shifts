'use client'
import { Radio, RadioGroup, Select, SelectItem } from '@nextui-org/react'
import React from 'react'

const NewShifts = ({ obrasSociales }) => {
    return (
        <div className='flex flex-col max-w-xl m-auto justify-center bg-slate-400'>
            <h1 className='font-bold text-2xl mb-6'>Solicitar turno online</h1>

            <div >
                <Select
                    label="Seleccionar Obra Social"
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
                <RadioGroup
                    orientation="horizontal"
                >
                    <Radio value="buenos-aires">Especialidad</Radio>
                    <Radio value="sydney">Profesional</Radio>
                </RadioGroup>
            </div>
        </div>
    )
}

export default NewShifts