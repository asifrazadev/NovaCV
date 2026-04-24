import { NextRequest, NextResponse } from "next/server"
import chromium from "@sparticuz/chromium"
import puppeteer from "puppeteer-core"
import { createClient } from "@/utils/supabase/server"

// Increase timeout for serverless environments
export const maxDuration = 60

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { id } = params
  
  // 1. Verify Authentication
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  // 2. Setup Host URL
  let host = request.nextUrl.origin
  
  // Force http for localhost if we detect https being incorrectly reported
  // or if we want to avoid SSL issues in dev
  if (host.startsWith("https://localhost") || host.startsWith("https://127.0.0.1")) {
    host = host.replace("https://", "http://")
  }
  
  const exportUrl = `${host}/resumes/${id}/export`

  // 3. Get Resume Metadata for Format
  const { data: resume } = await supabase
    .from("resumes")
    .select("data")
    .eq("id", id)
    .single()

  if (!resume) {
    return new NextResponse("Resume not found", { status: 404 })
  }

  const { format, width, height } = resume.data.metadata.page || { format: "a4" }

  let browser = null

  try {
    // 4. Launch Puppeteer
    const isLocal = process.env.NODE_ENV === "development"
    const chromiumAny = chromium as any
    
    browser = await puppeteer.launch({
      args: [...(chromiumAny.args || []), "--ignore-certificate-errors", "--ignore-certificate-errors-spki-list"],
      defaultViewport: chromiumAny.defaultViewport || { width: 1280, height: 720 },
      executablePath: isLocal 
        ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        : await chromiumAny.executablePath(),
      headless: chromiumAny.headless !== undefined ? chromiumAny.headless : true,
    })

    const page = await browser.newPage()

    // 5. Set Authentication Cookie for the headless browser
    const cookies = request.cookies.getAll()
    if (cookies.length > 0) {
      await page.setCookie(...cookies.map(c => ({
        name: c.name,
        value: c.value,
        domain: request.nextUrl.hostname,
        path: "/",
        secure: request.nextUrl.protocol === "https:",
        sameSite: "Lax" as const
      })))
    }

    // 6. Navigate to the export page
    await page.goto(exportUrl, {
      waitUntil: "networkidle0",
      timeout: 30000,
    })

    // 7. Generate PDF with dynamic format
    const pdfOptions: any = {
      printBackground: true,
      displayHeaderFooter: false,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    if (format === "custom" && width && height) {
      pdfOptions.width = `${width}mm`
      pdfOptions.height = `${height}mm`
    } else {
      // Puppeteer format supports "Letter", "Legal", "A4", etc.
      pdfOptions.format = format.charAt(0).toUpperCase() + format.slice(1)
    }

    const pdf = await page.pdf(pdfOptions)

    // 7. Return the PDF blob
    // Use Buffer.from(pdf) to satisfy BodyInit type
    return new Response(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume-${id}.pdf"`,
      },
    })
  } catch (error: any) {
    console.error("[api/pdf] Error:", error)
    return new NextResponse(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
