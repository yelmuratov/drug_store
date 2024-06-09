import DrugCard from "@/components/cards/drug.card"
import $axios from "@/http"
import { IDrug } from "@/interfaces"
import { useQuery } from "@tanstack/react-query"
import { Fade } from "react-awesome-reveal"

function Products() {
    const {data,isLoading,error} = useQuery({
        queryKey: ['get-products'],
        queryFn: async () => {
            const {data} = await $axios.get('/drugs/')
            return data
        }
    })

    console.log(data)

  return (
    <div className="container mx-w-4xl mx-auto mt-14">
        <h1 className="text-gray-700 mb-12 text-center font-sans font-bold text-3xl">Our <span className="text-blue-600 font-bold select-none underline">Products</span></h1>
        <div className="grid md:grid-cols-3 gap-4 pl-6">
            {
                data?.map((drug:IDrug) => (
                    <Fade key={drug.id} direction="left" triggerOnce>
                        <DrugCard drug={drug}/>
                    </Fade>
                ))
            }
        </div>
    </div>
  )
}

export default Products