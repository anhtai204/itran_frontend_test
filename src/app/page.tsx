import Image from "next/image"
import Link from "next/link"
import { Search, ChevronRight, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-400 bg-clip-text text-transparent">
                ITACH EDU
              </span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium">
                Home
              </Link>
              <Link href="/explore" className="text-sm font-medium">
                Explore
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium">
              Log in
            </Link>
            <Button size="sm" className="rounded-full" variant="outline">
              Sign up
            </Button>
            <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-400 w-8 h-8 text-white">
              <span className="text-xs">JD</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-purple-100 to-white pt-16 pb-24">
          <div className="container text-center max-w-3xl mx-auto px-4">
            <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm mb-6">
              <span className="text-xs">Your Professional Marketplace</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
              Showcase Your Mastery. Get Connected
            </h1>
            <p className="text-gray-600 mb-8">Connect with other professionals and clients to grow your career</p>

            <div className="bg-white rounded-lg p-2 shadow-md flex flex-col sm:flex-row gap-2 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Job/Profession" className="pl-9 rounded-full" />
              </div>
              <div className="flex items-center gap-2 px-3">
                <RadioGroup defaultValue="professionals" className="flex">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="professionals" id="professionals" />
                    <Label htmlFor="professionals">By Profession</Label>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <RadioGroupItem value="company" id="company" />
                    <Label htmlFor="company">By Company</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button className="rounded-full">Search</Button>
            </div>
          </div>

          {/* Profile Images */}
          <div className="container overflow-hidden">
            <div className="flex gap-4 justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=128&width=128`}
                    alt={`Profile ${i}`}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Discover Section */}
        <section className="py-16">
          <div className="container text-center max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">Discover the Emerging Masters</h2>
            <p className="text-gray-600 mb-8">Connect with talented professionals across various industries</p>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                "All Industries",
                "IT Developer",
                "Product Manager",
                "Designer",
                "UI/UX Expert",
                "Content Marketing",
                "Web Design",
              ].map((category) => (
                <div key={category} className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm">
                  <span>{category}</span>
                </div>
              ))}
            </div>

            {/* Professional Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Daniel Martin", role: "Designer", rating: "4.9", projects: "12" },
                { name: "Dorothy Wood", role: "UI/UX Expert", rating: "4.8", projects: "15", featured: true },
                { name: "Timothy Baker", role: "Developer", rating: "4.7", projects: "8" },
                { name: "Wayne Scott", role: "Marketing", rating: "4.9", projects: "20" },
                { name: "Patricia Manning", role: "Content Writer", rating: "4.6", projects: "10" },
                { name: "Jack Hill", role: "SEO Expert", rating: "4.8", projects: "14" },
                { name: "Kathryn Sanchez", role: "Product Manager", rating: "4.9", projects: "7" },
                { name: "Jamie Kirkland", role: "Web Designer", rating: "4.7", projects: "9" },
              ].map((profile, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-4 flex flex-col items-center ${profile.featured ? "bg-blue-50 border border-blue-100" : "border"}`}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                    <Image
                      src={`/placeholder.svg?height=64&width=64`}
                      alt={profile.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">{profile.name}</h3>
                  <p className="text-sm text-gray-500">{profile.role}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="text-xs">
                      <span className="font-bold">{profile.rating}</span> Rating
                    </div>
                    <div className="text-xs">
                      <span className="font-bold">{profile.projects}</span> Projects
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="mt-8 rounded-full">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-2">Why Choose Masters in Me?</h2>
            <p className="text-gray-600 mb-12 max-w-lg mx-auto">
              A platform designed to connect professionals with clients looking for specialized expertise
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Professional"
                  width={300}
                  height={400}
                  className="rounded-xl mx-auto"
                />

                {/* Feature Cards */}
                <div className="absolute top-10 -right-10 bg-white rounded-lg p-4 shadow-md w-48">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Networking Opportunities</h3>
                      <p className="text-xs text-gray-500">Connect with industry professionals</p>
                      <Button variant="outline" size="sm" className="mt-2 text-xs h-7 rounded-full">
                        Learn more
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-10 -right-10 bg-white rounded-lg p-4 shadow-md w-48">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Showcase Work</h3>
                      <p className="text-xs text-gray-500">Display your portfolio to potential clients</p>
                      <Button variant="outline" size="sm" className="mt-2 text-xs h-7 rounded-full">
                        Learn more
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-10 left-10 bg-white rounded-lg p-4 shadow-md w-48">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Secure Payments</h3>
                      <p className="text-xs text-gray-500">Safe and reliable payment system</p>
                      <Button variant="outline" size="sm" className="mt-2 text-xs h-7 rounded-full">
                        Learn more
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 text-left">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold">Showcase Work</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Display your portfolio and skills to potential clients and employers
                  </p>
                  <Button className="mt-3 rounded-full">Get Started</Button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-pink-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold">Find Clients</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Connect with businesses looking for your specific skills and expertise
                  </p>
                  <Button className="mt-3 rounded-full">Explore</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-16">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-2">We are happy to work with incredible clients</h2>
            <p className="text-gray-600 mb-12">The trusted platform where professionals and businesses connect</p>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-500">Logo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    01
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm flex-1">
                    <h3 className="font-semibold mb-1">Sign Up and create Account</h3>
                    <p className="text-sm text-gray-600">Create your professional profile in minutes</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                    02
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm flex-1">
                    <h3 className="font-semibold mb-1">Upload Your Portfolio</h3>
                    <p className="text-sm text-gray-600">Add your work samples, skills, and experience</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">
                    03
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm flex-1">
                    <h3 className="font-semibold mb-1">Get Discovered</h3>
                    <p className="text-sm text-gray-600">Let clients find you for their next project</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="How it works"
                  width={500}
                  height={400}
                  className="rounded-xl"
                />
                <div className="absolute -bottom-4 -left-4 flex">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-white overflow-hidden ${i > 1 ? "-ml-3" : ""}`}
                    >
                      <Image
                        src={`/placeholder.svg?height=32&width=32`}
                        alt={`User ${i}`}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs -ml-3">
                    +5
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">What our clients say</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900 text-white p-8 rounded-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-semibold">Michael Ross</h3>
                    <p className="text-sm text-gray-400">CEO at Acme Inc</p>
                  </div>
                </div>
                <p className="text-lg mb-6">
                  "Working with Master In me has been an incredibly painless and enjoyable experience."
                </p>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Testimonial"
                  width={500}
                  height={300}
                  className="rounded-xl h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently asked Questions</h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">Q</div>
                    <span>How do I create an account on the platform?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm">
                      Creating an account is simple! Click on the "Sign Up" button in the top right corner, fill in your
                      details, and follow the verification process. Once verified, you can start building your
                      professional profile.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">Q</div>
                    <span>How do I apply for a job through this platform?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-sm">
                    Browse available jobs in your field, review the requirements, and click "Apply" on jobs that match
                    your skills. You can also set up job alerts to be notified of new opportunities.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">Q</div>
                    <span>How can I track the status of my job applications?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-sm">
                    You can track all your applications in the "My Applications" section of your dashboard. This shows
                    the status of each application and any messages from potential employers.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">Q</div>
                    <span>Is there a cost to use the job board, and what features are free?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-sm">
                    Basic features like creating a profile and applying to jobs are free. Premium features such as
                    priority applications and advanced profile customization require a subscription plan.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Join ambitious professionals and unlock your dream career today
              </h2>
              <p className="mb-8 opacity-90">
                Create your professional profile and connect with clients looking for your skills
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">Free to join</span>
                </div>

                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">No hidden fees</span>
                </div>
              </div>

              <Button className="mt-8 bg-white text-indigo-600 hover:bg-white/90 hover:text-indigo-700 rounded-full">
                Get Started
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center mb-4">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-400 bg-clip-text text-transparent">
                  ITACH EDU
                </span>
              </Link>
              <p className="text-sm text-gray-500 mb-4">Connecting professionals with opportunities since 2023</p>
              <div className="text-sm text-gray-500">
                <p>Phone: +1 (123) 456-7890</p>
                <p>Email: contact@itachedu.com</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-900">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/explore" className="text-gray-500 hover:text-gray-900">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-500 hover:text-gray-900">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-500 hover:text-gray-900">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-500 hover:text-gray-900">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-500 hover:text-gray-900">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-500 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-500 hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-500 hover:text-gray-900">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-gray-500 hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-500 hover:text-gray-900">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-500 hover:text-gray-900">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="text-gray-500 hover:text-gray-900">
                    GDPR Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2023 ITACH EDU. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

