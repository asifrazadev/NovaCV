'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { type Provider } from '@supabase/supabase-js'

export async function login(formData: FormData) {
  const supabase = await createClient()
  console.log(formData)
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    redirect(`/login?message=${error.message}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  })
  console.log(error)
  if (error) {
    redirect('/register?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/register?status=success')
}

export async function signInWithProvider(formData: FormData) {
  const provider = formData.get('provider') as unknown as Provider
  const supabase = await createClient()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  })

  if (error) {
    redirect(`/register?message=OAuth sign in failed`)
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function forgotPassword(formData: FormData) {
  const email = formData.get('email') as string
  const supabase = await createClient()
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  console.log(process.env.NEXT_PUBLIC_APP_URL)
  console.log('Attempting password reset for:', email)
  console.log('Redirect URL:', `${siteUrl}/auth/callback?next=/dashboard/security`)

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/reset-password`,
  })

  if (error) {
    console.error('Supabase reset error:', error)
    redirect(`/forgot-password?message=${error.message}`)
  }

  redirect('/forgot-password?message=Password reset link sent to your email')
}

export async function resetPassword(formData: FormData) {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm_password') as string
  const oldPassword = formData.get('old_password') as string
  const redirectTo = (formData.get('redirectTo') as string) || '/dashboard/security'

  if (password !== confirmPassword) {
    redirect(`${redirectTo}?message=Passwords do not match`)
  }

  const supabase = await createClient()

  // If old password is provided, verify it first
  if (oldPassword) {
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.email) {
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: oldPassword,
      })
      if (verifyError) {
        redirect(`${redirectTo}?message=Current password is incorrect`)
      }
    }
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    redirect(`${redirectTo}?message=${error.message}`)
  }

  redirect(`${redirectTo}?message=Password updated successfully`)
}

export async function updateEmail(formData: FormData) {
  const email = formData.get('email') as string
  const supabase = await createClient()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const { error } = await supabase.auth.updateUser({
    email: email,
  }, {
    emailRedirectTo: `${siteUrl}/auth/callback?next=/dashboard/profile&message=Email updated successfully`,
  })

  if (error) {
    redirect(`/dashboard/profile?message=${error.message}`)
  }

  redirect('/dashboard/profile?message=Confirmation link sent to both old and new email addresses')
}

export async function updateProfileMetadata(formData: FormData) {
  const fullName = formData.get('full_name') as string
  const title = formData.get('title') as string
  const bio = formData.get('bio') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      professional_title: title,
      bio: bio
    }
  })

  if (error) {
    redirect(`/dashboard/profile?message=${error.message}`)
  }

  revalidatePath('/dashboard/profile')
  redirect('/dashboard/profile?message=Profile updated successfully')
}
