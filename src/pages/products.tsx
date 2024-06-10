import DrugCard from "@/components/cards/drug.card";
import CardSkeleton from "@/components/shared/card.skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import $axios from "@/http";
import { IDrug } from "@/interfaces";
import { drugStore } from "@/store/drug.store";
import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";

function Products() {
  const { setDrugs, drugs } = drugStore();
  const { isLoading, error } = useQuery({
    queryKey: ["get-products"],
    queryFn: async () => {
      const { data } = await $axios.get("/drugs/");
      setDrugs(data);
      return data;
    },
  });

  return (
    <div className="container mx-w-4xl mx-auto mt-14 pb-24">
      <h1 className="text-gray-700 mb-12 text-center font-sans font-bold text-3xl">
        Our{" "}
        <span className="text-blue-600 font-bold select-none underline">
          Products
        </span>
      </h1>
      {error ? (
        <div className="h-[60vh]">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 pl-6">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
            : drugs.map((drug: IDrug) => (
                <Fade key={drug.id} direction="left" triggerOnce>
                  <DrugCard drug={drug} />
                </Fade>
              ))}
        </div>
      )}
    </div>
  );
}

export default Products;
