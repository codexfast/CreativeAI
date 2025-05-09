import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMutation, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
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

import { fetchAllTasks, fetchTask } from "@/api/creative";

interface Item {
  id: number;
  nome: string;
}

type ShowActivityDrawerProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  task_id: string
};

const ShowActivityDrawer = ({ open, setOpen, task_id }: ShowActivityDrawerProps) => {

    const {
      data,
      isLoading,
    } = useQuery({
      queryKey: ['task', task_id],
      queryFn: () => fetchTask({task_id}),
    });

    

  return (
    <Drawer open={open} onOpenChange={setOpen}>

      {isLoading ? <Loader2 className="animate-spin h-6 w-6"/> :
<DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="space-x-1">
            {data.tags.map((tag, index) => <Badge key={index}>{tag}</Badge>)}
          </DrawerTitle>
          <DrawerDescription>
            {data.prompt}
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>

              {data.results.map((result, index) => (
                <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/6">
                  <div className="p-0">
                    <Card className="p-0">
                      <CardContent className="flex aspect-auto items-center justify-center p-0">
                      <img
                          src={
                            "http://192.168.100.205:8000/output/"+result
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
              {/*{Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/6">
                  <div className="p-0">
                    <Card className="p-0">
                      <CardContent className="flex aspect-auto items-center justify-center p-0">
                      <img
                          src={
                            "http://192.168.100.205:8000/output/00001.png"
                          }
                          alt={`Imagem ${index + 1}`}
                          className="w-full aspect-auto object-cover rounded-md"
                          loading="lazy"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}*/}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <DrawerFooter>
          <Button>Baixar</Button>
        </DrawerFooter>
      </DrawerContent>
    }
      
    </Drawer>
  );
};

export default function Activity() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [taskID, setTaskID] = useState();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['tasks'],
    queryFn: fetchAllTasks,
    // refetchInterval: 1500,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 0 ? undefined : allPages.length + 1,
  });

  const loader = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, [hasNextPage, fetchNextPage]);

  const handleClick = (taskID) => {
    setTaskID(taskID)
    setOpen(true);
  };
  
  return (
    <>
    <ul className="space-y-4">
      {data?.pages.flat().map((task) => (
        <li
          key={task.task_id}
          className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer"
          onClick={() => handleClick(task.task_id)}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            {task.status === "done" ? (
              <GalleryThumbnails className="h-6 w-6" />
            ) : (
              <Loader2 className="h-6 w-6 animate-spin" />
            )}
          </div>
          <div className="space-y-1">
            <p className="font-medium leading-none">{task.quantity}x Imagens</p>
            <p className="text-sm text-muted-foreground truncate w-60">
              {task.prompt}
            </p>
            <p className="text-sm text-muted-foreground gap-0.5 flex">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </p>
          </div>
        </li>
      ))}
      <div ref={loader as any} className="h-10" />
    </ul>
      { taskID ? 
      <ShowActivityDrawer open={open} setOpen={setOpen} task_id={taskID}/> : null
      }
    </>
  );
}
