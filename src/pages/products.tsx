import { useState } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { isLoading: isLoadingProducts, error: errorProducts } = useQuery<IDrug[]>({
    queryKey: ["get-products"],
    queryFn: async () => {
      const { data } = await $axios.get("/drugs/");
      setDrugs(data);
      return data;
    },
  });

  const { data: categories, isLoading: isLoadingCategories, error: errorCategories } = useQuery<string[]>({
    queryKey: ["get-categories"],
    queryFn: async () => {
      const { data } = await $axios.get("/drugs/categories/");
      return data;
    },
  });

  const filteredDrugs = selectedCategory === "all" ? drugs : drugs.filter(drug => drug.category === selectedCategory);

  return (
    <div className="container w-full mx-auto mt-14 pb-24">
      <h1 className="text-gray-700 mb-12 text-center font-sans font-bold text-3xl">
        Our{" "}
        <span className="text-blue-600 font-bold select-none underline">
          Products
        </span>
      </h1>

      {errorProducts ? (
        <div className="h-[60vh]">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorProducts.message}</AlertDescription>
          </Alert>
        </div>
      ) : (
        <>
          <div className="mb-6 text-center">
            {isLoadingCategories ? (
              <p>Loading categories...</p>
            ) : errorCategories ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorCategories.message}</AlertDescription>
              </Alert>
            ) : (
              <div className="overflow-x-auto whitespace-nowrap">
                <div className="inline-flex space-x-4 px-4">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`p-2 border rounded-md ${
                      selectedCategory === "all" ? "bg-blue-500 text-white" : "bg-white text-blue-500"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories?.map((category, indx) => (
                    <button
                      key={indx}
                      onClick={() => setSelectedCategory(category)}
                      className={`p-2 border rounded-md ${
                        selectedCategory === category ? "bg-blue-500 text-white" : "bg-white text-blue-500"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 pl-6">
            {isLoadingProducts
              ? Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
              : filteredDrugs.map((drug: IDrug) => (
                  <Fade key={drug.id} direction="left" triggerOnce>
                    <DrugCard drug={drug} />
                  </Fade>
                ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
