import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, GalleryHorizontal, Activity, PencilRuler } from "lucide-react";

export default function Footer() {
  return (
    <footer className="sticky bottom-5 z-10">
      <div className="container px-4 mx-auto">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="w-full h-16 grid grid-cols-3">
            <TabsTrigger
              value="gallery"
              className="flex flex-col items-center justify-center"
            >
              <GalleryHorizontal className="h-5 w-5" />
              <span className="text-xs mt-1">Galeria</span>
            </TabsTrigger>
            <TabsTrigger
              value="home"
              className="flex flex-col items-center justify-center"
            >
              <PencilRuler className="h-5 w-5" />
              <span className="text-xs mt-1">Criar</span>
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="flex flex-col items-center justify-center"
            >
              <Activity className="h-5 w-5" />
              <span className="text-xs mt-1">Atividade</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </footer>
  );
}
