import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { useInfiniteQuery } from "@tanstack/react-query";

import { GalleryThumbnails, Loader2 } from "lucide-react";

import { fetchAllTasks } from "@/api/creative";

import { Drawer as VaulDrawer } from "vaul";
import { DrawerContentComponent } from "@/components/ShowDrawer";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Drawer = ({ open, onOpenChange, children }: DrawerProps) => {
  return (
    <VaulDrawer.Root open={open} onOpenChange={onOpenChange}>
      <VaulDrawer.Overlay className="fixed inset-0 bg-black/40">
        <VaulDrawer.Portal>
          <VaulDrawer.Content
            className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none"
            // style={{
            //   height: '80vh', // 👈 Altura customizada
            // }}
          >
            <div className="p-4 bg-gray-200 rounded-t-[10px] flex justify-center items-center">
              <div className="w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300" />
            </div>
            <div className="flex-1 overflow-auto p-4">{children}</div>
          </VaulDrawer.Content>
        </VaulDrawer.Portal>
      </VaulDrawer.Overlay>
    </VaulDrawer.Root>
  );
};

export default function Activity() {
  // const [items, setItems] = useState<Item[]>([]);
  // const [page, setPage] = useState(1);
  const [open, setOpen] = useState<boolean>(false);
  const [taskID, setTaskID] = useState<string>();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["tasks"],
    initialPageParam: 1,
    queryFn: fetchAllTasks,
    // refetchInterval: 1500,
    getNextPageParam: (lastPage: any[], allPages: any[][]) =>
      lastPage.length === 0 ? undefined : allPages.length + 1,
  });

  const loader = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
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

  const handleClick = (taskID: string) => {
    setTaskID(taskID);
    setOpen(true);
  };

  return (
    <>
      <ul className="space-y-4">
        {isLoading && <div>Loading...</div>}
        {data?.pages.flat().length === 0 && (
          <div className="text-center">Nenhuma tarefa encontrada</div>
        )}

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
              <p className="font-medium leading-none">
                {task.quantity}x Imagens
              </p>
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
      {taskID ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContentComponent task_id={taskID} />
        </Drawer>
      ) : null}
    </>
  );
}
