"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        // Base styles
        "z-50 w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-xl border border-cyan-400/30 outline-none",
        
        // Background with gradient and backdrop blur
        "bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl",
        
        // Shadow and glow effects
        "shadow-2xl shadow-cyan-500/25 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]",
        
        // Padding responsive
        "p-4 sm:p-5 lg:p-6",
        
        // Text color
        "",
        
        // Animations
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:scale-95 data-[state=open]:scale-100",
        
        // Slide animations from different sides
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        
        // Transform origin
        "origin-[--radix-popover-content-transform-origin]",
        
        // Hover and focus effects
        "transition-all duration-300",
        
        // Border glow animation
        "before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-r before:from-cyan-400/50 before:via-cyan-300/30 before:to-cyan-400/50 before:-z-10",
        "before:animate-pulse before:opacity-60",
        
        // Inner glow
        "after:absolute after:inset-[1px] after:rounded-xl after:bg-gradient-to-br after:from-black/90 after:via-gray-900/90 after:to-black/90 after:-z-10",
        
        // Responsive positioning
        "relative",
        
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }