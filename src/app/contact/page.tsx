import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground">
            Get in touch with the Puthir team
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-xl p-8 border shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-card rounded-xl p-8 border shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    📧
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">support@puthir.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    💬
                  </div>
                  <div>
                    <p className="font-medium">Chat Support</p>
                    <p className="text-muted-foreground">Available 9 AM - 6 PM EST</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    🐙
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-muted-foreground">github.com/puthir</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-8 border shadow-sm">
              <h3 className="text-xl font-semibold mb-4">FAQ</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm">How many questions are in each quiz?</p>
                  <p className="text-muted-foreground text-sm">Each quiz contains 10-15 questions covering the selected topic.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Is this free to use?</p>
                  <p className="text-muted-foreground text-sm">Yes! Puthir is completely free for all AWS Cloud Practitioner prep.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Can I track my progress?</p>
                  <p className="text-muted-foreground text-sm">Progress tracking is coming soon in our next update.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}