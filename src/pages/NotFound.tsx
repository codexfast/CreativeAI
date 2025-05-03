import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 py-12 md:py-24 lg:py-32">
      <div className="container flex flex-col items-center justify-center space-y-10 text-center">
        <div className="space-y-10">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">404 - Página não encontrada</h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Desculpe, não podemos encontrar a página que você está procurando.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <div className="grid gap-2">
            <Button asChild>
              <a href="/" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volte para o início
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
