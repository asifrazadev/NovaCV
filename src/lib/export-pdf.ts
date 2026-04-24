/**
 * Export the resume to PDF using the server-side Puppeteer API.
 */
export async function exportResumeToPDF(
  resumeId: string,
  filename: string = "resume.pdf"
): Promise<boolean> {
  try {
    const response = await fetch(`/api/resumes/${resumeId}/pdf`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || "Failed to generate PDF")
    }

    // Process the PDF blob
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)

    // Trigger download
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", filename.endsWith(".pdf") ? filename : `${filename}.pdf`)
    document.body.appendChild(link)
    link.click()

    // Cleanup
    link.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(url)

    return true
  } catch (error) {
    console.error("[export-pdf] PDF generation failed:", error)
    return false
  }
}