"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import "./Navbar.css";

const DeployableMenu = () => {
  return(
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-black border-neutral-800 absolute z-20">
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] text-[#CCCCCC] relative">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none transition-all duration-500 hover:shadow-lg hover:bg-neutral-800 focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-semibold">
                      Add to Chrome
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground text-zinc-500 text-center">
                      Add Chatty to your chrome extension and start using it right now.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                How to use Chatty correctly.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install Chatty to your Computer.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = ({href, title, children} : {href : string, title : string, children : string}) => {
  return (
    <li className="transition-all duration-500 hover:shadow-lg hover:bg-neutral-800 focus:shadow-md p-3 rounded-md">
      <Link href={href}>
        <h1 className="text-base font-medium">{title}</h1>
        <p className="text-zinc-500 text-xs">{children}</p>
      </Link>
    </li>
  )
}

export default DeployableMenu