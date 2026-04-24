# 🌌 NovaCV - Premium Resume Builder

NovaCV is a high-fidelity, open-source resume builder designed for the modern job seeker. Built with speed, aesthetics, and ATS-optimization in mind, it provides a seamless "What You See Is What You Get" (WYSIWYG) experience.

![NovaCV Banner](https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200&h=400)

## ✨ Features

### 🚀 Currently Implemented
- **Real-time WYSIWYG Builder**: Experience instant feedback with a live side-by-side editor and paginated preview.
- **High-Fidelity PDF Export**: Pixel-perfect PDF generation that matches your screen exactly, optimized for ATS (Applicant Tracking Systems).
- **Dynamic Pagination**: Intelligent content overflow management that ensures your resume looks professional across multiple pages.
- **Modular Section Management**:
  - **Basics**: Essential contact and professional information.
  - **Work Experience**: Detailed career history with rich text support.
  - **Education**: Academic background and achievements.
  - **Projects**: Showcase your personal and professional work.
  - **Skills & Languages**: Custom tag-based sections for easy readability.
  - **Summary**: Impactful professional bios.
  - **Social Profiles**: Integration with `react-social-icons` for a polished look.
- **Advanced Customization**:
  - **Design System**: Toggle between Light and Dark modes.
  - **Typography**: Curated font selections (e.g., Geist).
  - **Layout Engine**: Flexible column configurations and section reordering via drag-and-drop.
  - **Theming**: Custom primary colors and spacing tokens.
- **Secure Authentication**: Power by Supabase, supporting Email, Google, and GitHub providers.
- **Dashboard**: A sleek control center to manage multiple resume versions and drafts.
- **AI-Powered PDF Import**: Next-gen resume ingestion using AI to extract structured data from standard PDF files.
- **Public Sharing Engine**: Secure, unique URLs for each resume, allowing for high-performance live web views.
- **Mobile-First Responsiveness**: Optimized builder experience for tablets and mobile devices with a dedicated preview mode.
- **AI-Ready Infrastructure**: Built-in, user-configurable support for OpenAI, Anthropic, and Gemini.

### 🛠️ In Progress & Upcoming
- [ ] **AI-Powered Assistant**: Automatic bullet point optimization and professional summary generation.
- [ ] **Expanded Template Gallery**: A library of diverse, industry-specific templates.
- [ ] **Multilingual Support**: Localized resumes for global job markets.
- [ ] **Analytics Dashboard**: Track views, downloads, and engagement metrics.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Database & Auth**: [Supabase](https://supabase.com)
- **Editor**: [Tiptap](https://tiptap.dev)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com)
- **PDF Engine**: [`@react-pdf/renderer`](https://react-pdf.org) & [Puppeteer](https://pptr.dev)
- **Icons**: [Lucide React](https://lucide.dev) & [React Social Icons](https://jaketrent.com/react-social-icons/)

## 🏁 Getting Started

### Prerequisites
- Node.js 20+
- A Supabase Project (refer to `.env.example` for required variables)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/novacv.git
   cd novacv
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up local environment**:
   ```bash
   cp .env.example .env.local
   ```
   *Fill in your Supabase credentials and other API keys.*

4. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to start building.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

---

Built with ❤️ by the NovaCV Team.
