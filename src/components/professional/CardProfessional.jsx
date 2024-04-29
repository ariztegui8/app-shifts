import { Avatar, Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import DeleteProfessional from './DeleteProfessional';
import EditProfessional from './EditProfessional';

const CardProfessional = ({ prof, viewType, setProfessionals }) => {

  const router = useRouter()

  const handlePageId = () => {
    router.push(`/dashboard-admin/${prof._id}`)
  };

  const imageUrl = prof?.image ? prof.image : process.env.NEXT_PUBLIC_CLOU_DEFAULT_IMAGE;
  // console.log("URL de la imagen en el componente:", imageUrl);

  return (
    <div onClick={handlePageId} className={`flex gap-4 border border-fuchsia-500 rounded-md items-center ${viewType === 'list' ? 'p-1 justify-between' : 'p-3 flex-col'} transition-all duration-400 ease-in-out cursor-pointer hover:bg-neutral-100`}>
      <div className={`flex gap-2 items-center ${viewType === 'list' ? 'flex-row' : 'flex-col'}`}>
        <Avatar className={`${viewType === 'list' ? 'w-12 h-12' : 'w-16 h-16'}`} src={imageUrl} />
        <div className={`${viewType === 'card' ? 'text-center' : ''}`}>
          <p className='font-bold'>{prof.nombre} {prof.apellido}</p>
          <p className='text-sm text-gray-500'>{prof.especialidad}</p>
        </div>
      </div>

      <div className='flex gap-2' onClick={(e) => e.stopPropagation()}>
        <EditProfessional
          setProfessionals={setProfessionals}
          prof={prof}
        />
        <DeleteProfessional
          setProfessionals={setProfessionals}
          prof={prof}
        />
      </div>

    </div>
  )
}

export default CardProfessional