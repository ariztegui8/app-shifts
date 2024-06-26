'use client'
import React, { useEffect, useRef, useState } from 'react'

const ListObrasSociales = ({obrasSociales}) => {


    return (
        <div>
            {obrasSociales.length > 0 ?
                obrasSociales.map(os => (
                   <div key={os._id}>
                    <p>{os.nombre}</p>
                   </div>
                ))
                :
                <p className="col-span-full text-center">No hay artículos disponibles.</p>
            }
        </div>
    )
}

export default ListObrasSociales