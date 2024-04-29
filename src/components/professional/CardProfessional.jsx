import { Avatar } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const CardProfessional = ({prof, viewType}) => {

    const router = useRouter()

    const handlePageId = () => {
        router.push(`/dashboard-admin/${prof._id}`)
      };

    const imageUrl = prof?.image ? prof.image : process.env.NEXT_PUBLIC_CLOU_DEFAULT_IMAGE;
    // console.log("URL de la imagen en el componente:", imageUrl);

  return (
    <div onClick={handlePageId}>
         <div className={`border border-fuchsia-500 rounded-md flex items-center gap-2 cursor-pointer ${viewType === 'list' ? 'p-1' : 'p-3 flex-col'} transition-all duration-400 ease-in-out`}>
          <Avatar className={`${viewType === 'list' ? 'w-12 h-12' : 'w-16 h-16'}`} src={imageUrl} />
          <div className={`${viewType === 'card' ? 'text-center' : ''}`}>
            <p className='font-bold'>{prof.title}</p>
            <p className='text-sm text-gray-500'>{prof.description}</p>
          </div>
        </div>
    </div>
  )
}

export default CardProfessional