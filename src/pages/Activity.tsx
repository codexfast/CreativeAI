import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
} from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { GalleryThumbnails, Loader2 } from "lucide-react";

interface Item {
  id: number;
  nome: string;
}

type ShowActivityDrawerProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const ShowActivityDrawer = ({ open, setOpen }: ShowActivityDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="space-x-1">
            <Badge>Retrato</Badge>
            <Badge>Qualidade Baixa</Badge>
            <Badge>Flux.1 Dev</Badge>
          </DrawerTitle>
          <DrawerDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ea
            necessitatibus quaerat totam, quidem cumque consectetur aperiam
            molestiae tempore consequatur quos omnis aliquam ab! Modi eaque
            explicabo laborum atque nam?
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          {/* <Carousel className="w-full overflow-x-auto">
            <CarouselContent className="justify-center">
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-2/6 lg:basis-1/6"
                >
                  <div className="p-2 min-w-0">
                    <Card className="p-0">
                      <CardContent className="rounded-xl p-0 flex aspect-auto items-center justify-center bg-muted">
                        <img
                          src={
                            "https://loremflickr.com/cache/resized/defaultImage.small_400_600_nofilter.jpg"
                          }
                          alt={`Imagem ${index + 1}`}
                          className="w-full aspect-auto object-cover rounded-md"
                          loading="lazy"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative mr-2" />
              <CarouselNext className="relative ml-2" />
            </div>
          </Carousel> */}
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/6">
                  <div className="p-0">
                    <Card className="p-0">
                      <CardContent className="flex aspect-auto items-center justify-center p-0">
                      <img
                          src={
                            "https://loremflickr.com/cache/resized/defaultImage.small_400_600_nofilter.jpg"
                          }
                          alt={`Imagem ${index + 1}`}
                          className="w-full aspect-auto object-cover rounded-md"
                          loading="lazy"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <DrawerFooter>
          <Button>Baixar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default function Activity() {
  const [items, setItems] = useState<Item[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    // Simula uma requisição com delay
    const novosItens = Array.from({ length: 10 }, (_, i) => ({
      id: (page - 1) * 10 + i + 1,
      nome: `Item ${(page - 1) * 10 + i + 1}`,
    }));

    // Simula fim dos dados após 50 itens
    if (page >= 5) {
      setHasMore(false);
    }

    setItems((prev) => [...prev, ...novosItens]);
    setPage((prev) => prev + 1);
  };

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Carregando...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Fim da lista</b>
          </p>
        }
      >
        <ul className="space-y-4">
          <li
            key={"1313"}
            className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
            <div className="space-y-1">
              <p className="font-medium leading-none">Gerando 20 imagens</p>
              <p className="text-sm text-muted-foreground truncate w-60">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Sapiente deleniti at illo enim. Cupiditate est, quisquam ducimus
                ipsum minima, placeat voluptate et ratione sint excepturi nulla.
                Quis molestiae corporis cupiditate.
              </p>
              <p className="text-sm text-muted-foreground gap-0.5 flex">
                <Badge variant="secondary">Retrato</Badge>
                <Badge variant="secondary">Qualidade Baixa</Badge>
                <Badge variant="secondary">Flux.1 Dev</Badge>
              </p>
            </div>
          </li>
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer"
              onClick={handleClick}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <GalleryThumbnails className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="font-medium leading-none">4x Imagens</p>
                <p className="text-sm text-muted-foreground truncate w-60">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Sapiente deleniti at illo enim. Cupiditate est, quisquam
                  ducimus ipsum minima, placeat voluptate et ratione sint
                  excepturi nulla. Quis molestiae corporis cupiditate.
                </p>
                <p className="text-sm text-muted-foreground gap-0.5 flex">
                  <Badge variant="secondary">Retrato</Badge>
                  <Badge variant="secondary">Qualidade Baixa</Badge>
                  <Badge variant="secondary">Flux.1 Dev</Badge>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
      <ShowActivityDrawer open={open} setOpen={setOpen} />
    </>
  );
}
