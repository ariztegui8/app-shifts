'use client'
import React, { useEffect, useRef, useState } from 'react'

const ListEspecialidad = ({especialidades}) => {


    return (
        <div>
            {especialidades.length > 0 ?
                especialidades.map(os => (
                   <div key={os._id}>
                    <p>{os.nombre}</p>
                   </div>
                ))
                :
                <p className="col-span-full text-center">No hay especialidad disponible.</p>
            }
        </div>
    )
}

export default ListEspecialidad