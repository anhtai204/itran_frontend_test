import {
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Italic,
  List,
  Strikethrough,
  ListOrdered,
  Highlighter,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  AlignCenter,
} from "lucide-react";
import React from "react";
import { Toggle } from "./ui/toggle";

const MenuBar = ({ editor }: { editor: any | null }) => {
  if (!editor) {
    return null;
  }

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onclick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onclick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onclick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: () => editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Heading4 className="size-4" />,
      onclick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      pressed: () => editor.isActive("heading", { level: 4 }),
    },
    {
      icon: <Heading5 className="size-4" />,
      onclick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      pressed: () => editor.isActive("heading", { level: 5 }),
    },
    {
      icon: <Bold className="size-4" />,
      onclick: () => editor.chain().focus().toggleBold().run(),
      pressed: () => editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onclick: () => editor.chain().focus().toggleItalic().run(),
      pressed: () => editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onclick: () => editor.chain().focus().toggleStrike().run(),
      pressed: () => editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onclick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: () => editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onclick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: () => editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onclick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: () => editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onclick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: () => editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onclick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: () => editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onclick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: () => editor.isActive("highlight"),
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50 dark:bg-gray-800">
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed()}
          onPressedChange={option.onclick}
          className={`dark:text-white ${option.pressed() ? 'dark:bg-gray-600' : ''}`}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

export default MenuBar;
