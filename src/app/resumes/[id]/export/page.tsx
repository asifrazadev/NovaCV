import { getResumeById } from "@/app/dashboard/resumes/actions"
import { notFound } from "next/navigation"
import { ExportContent } from "./export-content"

export default async function ExportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const resume = await getResumeById(id)

  if (!resume) {
    notFound()
  }

  const { data } = resume
  const { format, width: customWidth, height: customHeight } = data.metadata.page || {}

  const PAGE_SIZES: Record<string, { width: number; height: number }> = {
    a4: { width: 210, height: 297 },
    letter: { width: 215.9, height: 279.4 },
    legal: { width: 215.9, height: 355.6 },
    executive: { width: 184.15, height: 266.7 },
  }

  // Get dimensions in mm
  const standardSize = PAGE_SIZES[format.toLowerCase()]
  const widthMm = format === "custom" ? (customWidth || 210) : (standardSize?.width || 210)
  const heightMm = format === "custom" ? (customHeight || 297) : (standardSize?.height || 297)

  // Determine the CSS @page size value
  // Standard formats like 'A4', 'Letter', 'Legal' are recognized by CSS
  // For custom sizes, we use the width and height
  const pageSize = (format !== "custom" && standardSize) ? format.charAt(0).toUpperCase() + format.slice(1) : `${widthMm}mm ${heightMm}mm`

  return (
    <div className="bg-white min-h-screen">
      <style dangerouslySetInnerHTML={{
        __html: `
        @page {
          size: ${pageSize};
          margin: 0;
        }
        body {
          background-color: white !important;
          margin: 0 !important;
          padding: 0 !important;
          -webkit-print-color-adjust: exact;
        }
        #resume-export-container {
          width: 100%;
          min-height: 0;
          margin: 0;
          padding: 0 !important;
        }
        .resume-page {
          width: 100%;
          height: ${heightMm}mm;
          overflow: hidden;
          position: relative;
          background: white;
        }
        .resume-page:not(:last-child) {
          break-after: page;
          page-break-after: always;
        }
        /* Hide UI elements */
        .no-print {
          display: none !important;
        }
      `}} />

      {/* Inject custom CSS from metadata */}
      <style dangerouslySetInnerHTML={{ __html: data.metadata?.css || "" }} />

      <main id="resume-export">
        <ExportContent data={data} />
      </main>
    </div>
  )
}
