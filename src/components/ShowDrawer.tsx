import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { Download } from "lucide-react";

import { Drawer as VaulDrawer } from "vaul";

import { useQuery } from "@tanstack/react-query";
import { fetchTask } from "@/api/creative";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

import { DOWNLOAD_OUTPUT_URL, OUTPUT_URL } from "@/api";
import { Link } from "react-router-dom";

interface DrawerContentProps {
  task_id: string;
}

export const DrawerContentComponent = ({ task_id }: DrawerContentProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["task", task_id],
    queryFn: () => fetchTask({ task_id }),
  });

  if (isLoading) {
    return <div className="text-center">Carregando...</div>;
  }

  if (!data) {
    return <div className="text-center">Nenhuma tarefa encontrada</div>;
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <VaulDrawer.Title className="font-medium mb-4 text-gray-900 text-2xl flex">
        Resultado
        <VaulDrawer.Close asChild>
          <Button
            className="ml-auto hidden md:flex cursor-pointer"
            variant="ghost"
          >
            Fechar
          </Button>
        </VaulDrawer.Close>
        <Button asChild className="ml-2 hidden md:flex cursor-pointer">
          <Link to={DOWNLOAD_OUTPUT_URL + task_id} className="md:flex">
            <Download className="h-6 w-6" /> Baixar{" "}
            {data.quantity > 1 ? `(${data.quantity})` : ""}
          </Link>
    
        </Button>
      </VaulDrawer.Title>

      <h2 className="text-sm text-muted-foreground mb-2">{data.prompt}</h2>

      <div className="mb-4 flex gap-1 overflow-hidden">
        {data.tags.map((tag, index) => (
          <Badge key={index}>{tag}</Badge>
        ))}
      </div>

      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {data.results.map((result, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <img
                src={`${OUTPUT_URL}${result}`}
                alt={`Imagem ${index + 1}`}
                className="w-full rounded-md aspect-auto"
                loading="lazy"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Button className="w-full md:hidden mb-2">
        <Link to={DOWNLOAD_OUTPUT_URL + task_id}>
          Baixar {data.quantity > 1 ? `(${data.quantity})` : ""}
        </Link>
      </Button>
      <VaulDrawer.Close asChild>
        <Button className="md:hidden" variant="ghost">
          Fechar
        </Button>
      </VaulDrawer.Close>
    </div>
  );
};
