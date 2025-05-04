import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useTheme } from "@/components/theme-provider";

export default function Header() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header className="sticky top-0 z-10 border-b shadow-2xs bg-background">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <h1 className="text-xl font-bold">creative.ai</h1>
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/100" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
