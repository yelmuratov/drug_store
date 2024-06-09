import { IDrug } from "@/interfaces"
import { Card, CardContent, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

function drugCard({ drug}:{drug: IDrug}) {
  const baseUrl = import.meta.env.VITE_BASE_URL
  return ( 
    <Card>
      <img src={`${baseUrl}${drug.image}`} alt="drug image" className="rounded-t-md"/>
      <CardContent className="mt-4">
        <CardTitle className="text-center">{drug.drug_name}</CardTitle>
        <p className="text-center">{drug.description}</p>
      </CardContent>
      <div className="btns flex gap-2 p-4">
      <Button className="bg-blue-500 text-white w-full rounded-b-md">View</Button>
      <Button className="bg-blue-500 text-white w-full rounded-b-md">Add to Cart</Button>
      </div>
    </Card>
  )
}

export default drugCard