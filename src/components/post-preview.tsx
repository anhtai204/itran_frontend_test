"use client"

interface Block {
  id: string
  type: string
  content: string
}

interface PostPreviewProps {
  title: string
  description: string
  blocks: Block[]
  featuredImage?: string
}

export function PostPreview({ title, description, blocks, featuredImage }: PostPreviewProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      {/* Featured Image */}
      {featuredImage && (
        <div className="rounded-lg overflow-hidden">
          <img
            src={featuredImage || "/placeholder.svg"}
            alt={title}
            className="w-full h-auto max-h-[400px] object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=400&width=800"
            }}
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold">{title || "Untitled Post"}</h1>

      {/* Description */}
      {description && <p className="text-lg text-muted-foreground">{description}</p>}

      {/* Content Blocks */}
      <div className="space-y-6 mt-8">
        {blocks.map((block) => (
          <div key={block.id} className="prose prose-stone dark:prose-invert max-w-none">
            {renderBlockPreview(block)}
          </div>
        ))}
      </div>
    </div>
  )
}

function renderBlockPreview(block: Block) {
  switch (block.type) {
    case "text":
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: block.content
              .replace(/\n/g, "<br />")
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\*(.*?)\*/g, "<em>$1</em>")
              .replace(/~~(.*?)~~/g, "<del>$1</del>")
              .replace(/`(.*?)`/g, "<code>$1</code>")
              .replace(/# (.*?)(?:\n|$)/g, "<h1>$1</h1>")
              .replace(/## (.*?)(?:\n|$)/g, "<h2>$1</h2>")
              .replace(/### (.*?)(?:\n|$)/g, "<h3>$1</h3>"),
          }}
        />
      )
    case "image":
      return (
        <figure className="my-4">
          <img
            src={block.content || "/placeholder.svg?height=300&width=600"}
            alt="Content"
            className="rounded-md max-h-[400px] object-contain mx-auto"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=300&width=600"
            }}
          />
        </figure>
      )
    case "code":
      return (
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>{block.content}</code>
        </pre>
      )
    case "video":
      if (block.content.includes("youtube.com") || block.content.includes("youtu.be")) {
        // Extract YouTube video ID
        const videoId = block.content.includes("youtu.be")
          ? block.content.split("/").pop()
          : block.content.split("v=")[1]?.split("&")[0]

        return (
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md"
            ></iframe>
          </div>
        )
      } else if (block.content.startsWith("blob:") || block.content.startsWith("http")) {
        return (
          <video
            controls
            className="w-full rounded-md"
            src={block.content}
            onError={(e) => {
              e.currentTarget.style.display = "none"
            }}
          />
        )
      } else {
        return <p className="text-muted-foreground">Invalid video URL</p>
      }
    case "list":
      return (
        <ul className="list-disc pl-6">
          {block.content.split("\n").map((item, index) => (
            <li key={index}>{item.replace(/^-\s*/, "")}</li>
          ))}
        </ul>
      )
    default:
      return <p>{block.content}</p>
  }
}

