"use client"

import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Calculator,
  Sigma,
  Divide,
  Plus,
  Minus,
  Equal,
  X,
  Superscript,
  Subscript,
  Square,
  SquareIcon as SquareRoot,
  Pi,
  Infinity,
  ActivityIcon as Function,
  Percent,
} from "lucide-react"

interface MathToolbarProps {
  editor: Editor | null
}

export function MathToolbar({ editor }: MathToolbarProps) {
  if (!editor) {
    return null
  }

  const insertKatex = (formula: string) => {
    editor.chain().focus().insertKatex(formula).run()
  }

  const mathSymbols = [
    { icon: <Pi className="h-4 w-4" />, formula: "\\pi", tooltip: "Pi (π)" },
    { icon: <Sigma className="h-4 w-4" />, formula: "\\sum_{i=1}^{n} x_i", tooltip: "Sum (Σ)" },
    { icon: <Divide className="h-4 w-4" />, formula: "\\frac{a}{b}", tooltip: "Fraction" },
    { icon: <Square className="h-4 w-4" />, formula: "x^2", tooltip: "Square" },
    { icon: <SquareRoot className="h-4 w-4" />, formula: "\\sqrt{x}", tooltip: "Square Root" },
    { icon: <Plus className="h-4 w-4" />, formula: "a + b", tooltip: "Addition" },
    { icon: <Minus className="h-4 w-4" />, formula: "a - b", tooltip: "Subtraction" },
    { icon: <X className="h-4 w-4" />, formula: "a \\times b", tooltip: "Multiplication" },
    { icon: <Equal className="h-4 w-4" />, formula: "a = b", tooltip: "Equality" },
    { icon: <Superscript className="h-4 w-4" />, formula: "x^{n}", tooltip: "Superscript" },
    { icon: <Subscript className="h-4 w-4" />, formula: "x_{i}", tooltip: "Subscript" },
    { icon: <Function className="h-4 w-4" />, formula: "f(x) = x^2", tooltip: "Function" },
    { icon: <Infinity className="h-4 w-4" />, formula: "\\infty", tooltip: "Infinity" },
    { icon: <Percent className="h-4 w-4" />, formula: "\\%", tooltip: "Percent" },
  ]

  return (
    <div className="flex flex-wrap gap-1 border rounded-md p-1 mb-1 bg-slate-50 dark:bg-gray-800">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => insertKatex("")} className="h-8 px-2 dark:text-white">
              <Calculator className="h-4 w-4 mr-1" />
              <span>Formula</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Insert math formula</p>
          </TooltipContent>
        </Tooltip>

        {mathSymbols.map((symbol, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertKatex(symbol.formula)}
                className="h-8 w-8 p-0 dark:text-white"
              >
                {symbol.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{symbol.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  )
}

