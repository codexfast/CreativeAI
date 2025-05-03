import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import { GalleryHorizontal, GalleryVertical } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Home() {
  return (
    <Card className="w-full max-w-2xl mx-4 md:mx-0">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Crie Imagens</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prompt Input */}
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-base">
            Prompt
          </Label>
          <Textarea
            id="prompt"
            placeholder="Descreva a imagem que quer gerar..."
            className="h-44 py-2 resize-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Orientação
          </label>
          <ToggleGroup
            type="single"
            defaultValue="portrait"
            className="border rounded-md overflow-hidden"
          >
            <ToggleGroupItem
              value="portrait"
              aria-label="Modo retrato"
              className="px-4 py-2"
              size={"sm"}
            >
              <GalleryHorizontal className="w-4 h-4 mr-2" />
              Retrato
            </ToggleGroupItem>

            <ToggleGroupItem
              value="landscape"
              aria-label="Modo horizontal"
              className="px-4 py-2 border-l"
              size={"sm"}
            >
              <GalleryVertical className="w-4 h-4 mr-2" />
              Horizontal
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" disabled>
          {/* <Loader2 className="animate-spin" /> */}
          Gerar Imagens
        </Button>
      </CardFooter>
    </Card>
  );
}
