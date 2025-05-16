import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { ArrowRight, Loader2 } from "lucide-react";

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

import React from "react";
import { useLocalStorage } from "@/components/localstorage-provider";

import { useMutation } from "@tanstack/react-query";
import { createTask } from "@/api/creative";

interface Options {
  quality: "sm" | "md";
  orientation: "portrait" | "landscape";
  quantity: number;
}

type ContentPrompt = string;

export default function Home() {
  const { data, setData } = useLocalStorage();
  const [options, setOptions] = React.useState<Options>({
    quality: data.quality as "sm" | "md",
    orientation: data.orientation as "portrait" | "landscape",
    quantity: data.quantity
  });

  const [prompt, setPrompt] = React.useState <ContentPrompt>("")
  const [loading, setLoading] = React.useState(false)

  const { mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: (_) => {
      toast.info("Adicionado a fila, isto pode demorar um pouco.")
    },
    onError: (error) => {
      toast.error(error.message)
    }, onSettled: () => {
      setLoading(false)
    }
  })
  

  const createActivity = () => {
    if (prompt) {
      setLoading(true)
      setData({
        quality: options.quality,
        orientation: options.orientation,
        quantity: options.quantity,
      })
      

      mutate({
        prompt,
        ...options
      })
    }
  }

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
          onChange={(e) => {
            setPrompt(e.target.value)
          }}
        />
      </CardContent>
      <CardFooter className="lg:px-0 flex flex-col justify-end gap-3">
        <div className="flex flex-1 gap-2 justify-center sm:justify-end items-center relative w-full">

          <Select onValueChange={(value) => {
            setOptions({
              ...options,
              quality: value as "sm" | "md"
            })
          }} defaultValue={options.quality}>
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
          <Select onValueChange={(value) => {
            setOptions({
              ...options,
              orientation: value as "portrait" | "landscape"
            })
          }} defaultValue={options.orientation}>
            <SelectTrigger size="sm">
              <SelectValue placeholder="Orien.." />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectGroup>
                <SelectLabel>Selecione a orientação</SelectLabel>
                <SelectItem value="portrait">Retrato</SelectItem>
                <SelectItem value="landscape">Horizontal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => {
            setOptions({
              ...options,
              quantity: parseInt(value)
            })
          }} defaultValue={String(options.quantity)}>
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
          <Button size={"icon"} className="rounded-2xl cursor-pointer hidden sm:flex" onClick={createActivity} disabled={loading}>
            { loading ? <Loader2 className="animate-spin" /> : <ArrowRight className="h-5 w-5" />}
          </Button>
        </div>
        <Button size={"icon"} className="rounded-2xl cursor-pointer sm:hidden w-full" onClick={createActivity} disabled={loading}>
        { loading ? <Loader2 className="animate-spin" /> : <ArrowRight className="h-5 w-5" />}
        </Button>
      </CardFooter>
    </Card>
  );
}
