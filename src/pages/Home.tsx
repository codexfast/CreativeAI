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

interface Options {
  quality: string;
  orientation: string;
  quantity: number;
}

type ContentPrompt = String

export default function Home() {
  const { data, setData } = useLocalStorage();
  const [options, setOptions] = React.useState <Options> (data)

  const [prompt, setPrompt] = React.useState <ContentPrompt>("")
  const [loading, setLoading] = React.useState(false)

  

  const createActivity = () => {
    if (prompt) {
      setData({
        quality: options.quality,
        orientation: options.orientation,
        quantity: options.quantity,
      })
      setLoading(true)
      // fetch("/api/createActivity", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     prompt,
      //     options
      //   })
      // })

      toast.info("Adicionado a fila, isto pode demorar um pouco.")

      setLoading(false)
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
              quality: value
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
              orientation: value
            })
          }} defaultValue={options.orientation}>
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
