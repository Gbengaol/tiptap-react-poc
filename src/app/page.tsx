"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Tiptap from "./components/tiptap";
import { cn } from "@/lib/utils";

export default function Home() {
  const [html, setHTML] = useState(content);
  const handleChange = (val: string) => setHTML(val);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 overflow-hidden space-y-4">
      <Tiptap
        options={[
          "Bold",
          "Italic",
          "Underline",
          "Strikethrough",
          "Monospace",
          "Superscript",
          "Subscript",
          "BulletList",
          "OrderedList",
          "Redo",
          "Undo",
          "Link",
        ]}
        toolbarCustomButtons={[
          <Button
            className="size-8 p-2 rounded-full hover:scale-[1.05]"
            key="x-button"
          >
            X
          </Button>,
        ]}
        toolbarHidden={false}
        wrapperStyle={{
          border: "0.5px solid gray",
          width: "100%",
          maxHeight: "1000svh",
        }}
        toolbarStyle={{
          border: "none",
          borderTop: "1px solid #f2f2f2",
          boxShadow: "0 0 0 0",
          overflowX: "auto",
        }}
        wrapperClassName={cn(
          "w-full max-h-[1000svh] border border-[#f2f2f2] border-t-0"
          // "flex flex-col-reverse"
        )}
        editorClassName="w-full bg-[#fafafa] border-none p-4 placeholder:text-[#b4b7c9] font-medium"
        handleChange={handleChange}
        initialContent={content}
      />
      <pre className="w-full max-h-96 border text-wrap p-2">{html}</pre>
    </div>
  );
}

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;
