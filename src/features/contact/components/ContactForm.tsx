"use client";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'
import { Label } from '@/shared/components/ui/label'
import { contactFormSchema, type ContactFormData } from '@/features/contact/validations/contact'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Mail, Phone, MessageSquare, User, AlertCircle, CheckCircle } from 'lucide-react'
import { useContactForm } from '@/features/contact/hooks/use-contact'

interface ContactFormProps {
  onSuccess?: () => void
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const { 
    submitContact, 
    isLoading, 
    isSuccess, 
    isError, 
    error, 
    data, 
    reset: resetMutation 
  } = useContactForm()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      emailId: '',
      name: '',
      phoneNo: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (formData: ContactFormData) => {
    try {
      const result = await submitContact(formData)
      if (result.success) {
        resetForm()
        onSuccess?.()
      }
    } catch (error) {
      // Error is handled by React Query and available through the hook
      console.error('Form submission error:', error)
    }
  }

  return (


    <Card className="bg-gradient-to-br from-white/90 to-gray-50/40 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-8 border s
    hadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          Contact Us
        </CardTitle>
        <p className="text-muted-foreground text-center">
          Have a question or feedback? We&apos;d love to hear from you.
        </p>
        
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Success Message */}
          {isSuccess && data?.success && (
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
              <CheckCircle className="h-5 w-5" />
              <p>{data.message || 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'}</p>
            </div>
          )}

          {/* Error Message */}
          {(isError || (data && !data.success)) && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
              <AlertCircle className="h-5 w-5" />
              <p>{data?.error || error?.message || 'An unexpected error occurred. Please try again.'}</p>
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Name *
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Your full name"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field - Full Width */}
          <div className="space-y-2">
            <Label htmlFor="emailId" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email *
            </Label>
            <Input
              id="emailId"
              type="email"
              {...register('emailId')}
              placeholder="your@email.com"
              className={errors.emailId ? 'border-red-500' : ''}
            />
            {errors.emailId && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.emailId.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phoneNo" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number (Optional)
            </Label>
            <Input
              id="phoneNo"
              type="tel"
              {...register('phoneNo')}
              placeholder="+1 (555) 123-4567"
              className={errors.phoneNo ? 'border-red-500' : ''}
            />
            {errors.phoneNo && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.phoneNo.message}
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <Label htmlFor="subject">
              Subject *
            </Label>
            <Input
              id="subject"
              {...register('subject')}
              placeholder="What's this about?"
              className={`pt-3 ${errors.subject ? 'border-red-500' : ''}`}
            />
            {errors.subject && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message">
              Message *
            </Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Tell us more about your question or feedback..."
              rows={6}
              className={`pt-3 ${errors.message ? 'border-red-500' : ''}`}
            />
            {errors.message && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Sending...
              </>
            ) : (
              <>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            * Required fields
          </p>
        </form>
      </CardContent>
    </Card>
  )
}