import { AppearanceForm } from "./appearance-form"

export default function PreferencesPage() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Preferences</h1>
        <p className="text-muted-foreground">Customize your resume editor and platform UX.</p>
      </div>

      <AppearanceForm />
    </div>
  )
}
