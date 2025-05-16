import { Button } from "@/components/ui/button";
import { GalleryHorizontal, Activity, PencilRuler } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="sticky bottom-5 mx-4 md:mx-20">
      <div className="container px-3 py-1 mx-auto bg-background shadow-sm rounded-2xl">
        <div className="w-full gap-2 grid grid-cols-3">
          <Button
            className="flex flex-col items-center justify-center h-15 cursor-pointer"
            variant={"ghost"}
            asChild
          >
            <Link to="/gallery">
              <GalleryHorizontal className="h-5 w-5" />
              <span className="text-xs mt-1">Galeria</span>
            </Link>
          </Button>
          <Button
            className="flex flex-col items-center justify-center h-15 cursor-pointer"
            variant={"ghost"}
            asChild
          >
            <Link to="/create">
              <PencilRuler className="h-5 w-5" />
              <span className="text-xs mt-1">Criar</span>
            </Link>
          </Button>
          <Button
            className="flex flex-col items-center justify-center h-15 cursor-pointer"
            variant={"ghost"}
            asChild
          >
            <Link to="/activity">
              <Activity className="h-5 w-5" />
              <span className="text-xs mt-1">Atividade</span>
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
