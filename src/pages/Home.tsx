import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { ArrowRight } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  return (
    <Card className="w-full lg:p-6 sm:p-3">
      {/* <CardHeader>
        <h2 className="text-2xl font-bold text-center">Crie Imagens</h2>
      </CardHeader> */}
      <CardContent className="lg:px-0">
        <Textarea
          id="prompt"
          placeholder="Descreva a imagem que quer gerar..."
          className="h-80 py-2 resize-none"
        />
      </CardContent>
      <CardFooter className="lg:px-0 flex flex-col justify-end gap-3">
        <div className="flex flex-1 gap-2 justify-center sm:justify-end items-center relative w-full">

          <Select>
            <SelectTrigger size="sm">
              <SelectValue placeholder="Qual.."/>
            </SelectTrigger>
            <SelectContent side="top">
              <SelectGroup>
                <SelectLabel>Selecione a qualidade</SelectLabel>
                <SelectItem value="sm">Baixa</SelectItem>
                <SelectItem value="md">Média</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger size="sm">
              <SelectValue placeholder="Orien.." />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectGroup>
                <SelectLabel>Selecione a orientação</SelectLabel>
                <SelectItem value="portrait">Retrato</SelectItem>
                <SelectItem value="horizontal">Horizontal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger size="sm">
              <SelectValue placeholder="Qtd." />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectGroup>
                <SelectLabel>Selecione a quantidade</SelectLabel>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button size={"icon"} className="rounded-2xl cursor-pointer hidden sm:flex">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
        <Button size={"icon"} className="rounded-2xl cursor-pointer sm:hidden w-full">
            <ArrowRight className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
