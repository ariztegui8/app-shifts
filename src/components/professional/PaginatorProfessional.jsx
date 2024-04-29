import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const PaginatorProfessional = ({ page, totalPages, scroll, consumirApi }) => {

    const nextPage = () => {
        if (page < totalPages) {
            consumirApi(page + 1)
            scroll.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    const backPage = () => {
        if (page > 1) {
            consumirApi(page - 1)
            scroll.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div>
            <div className="flex justify-center">
                <button
                    onClick={backPage}
                    className={`text-[#19417f] rounded-l-lg px-2 ${page == 1 ? 'hidden' : ''}`}
                >
                    <MdKeyboardArrowLeft
                        size={30}
                        color="#19417f"
                    />
                </button>
                <button className=" text-[#19417f] font-medium px-2">Página {page} de {totalPages}</button>
                <button
                    onClick={nextPage}
                    className={`text-[#19417f] rounded-r-lg px-2 ${page == totalPages ? 'hidden' : ''}`}
                >
                    <MdKeyboardArrowRight
                        size={30}
                        color="#19417f"
                    />
                </button>
            </div>
        </div>
    )
}

export default PaginatorProfessional