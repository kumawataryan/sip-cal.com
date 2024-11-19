"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SIPCalculator } from "@/components/calculators/sip-calculator";
import { LumpsumCalculator } from "@/components/calculators/lumpsum-calculator";
import { AdvancedSIPCalculator } from "@/components/calculators/advanced-sip-calculator";
import { GoalCalculator } from "@/components/calculators/goal-calculator";
import { Calculator } from "lucide-react";
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";

export default function Home() {

  const { setTheme } = useTheme()

  return (
    <>
      <main>
        <div
          className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
          style={{
            backgroundImage: 'url("background.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6 flex justify-between items-center">

              <div className="flex items-center justify-center gap-3">
                <Calculator className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold text-white/80 dark:text-white">
                  SIP-CAL.COM
                </h1>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="bg-gradient-to-r from-white/15 to-white/20 dark:from-black/15 dark:to-black/20 backdrop-blur-lg rounded-xl shadow-2xl p-6 border-y border-t-white/20 border-b-white/20 border-x-0 border">
              <Tabs defaultValue="sip" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 rounded-xl border-0 bg-black/10 p-2 outline-none gap-2">
                  <TabsTrigger value="sip" className="border-0 bg-black/10 px-4 py-2.5 outline-none">SIP Calculator</TabsTrigger>
                  <TabsTrigger value="lumpsum" className="border-0 bg-black/10 px-4 py-2.5 outline-none">Lumpsum Calculator</TabsTrigger>
                  <TabsTrigger value="advanced" className="border-0 bg-black/10 px-4 py-2.5 outline-none">Advanced SIP</TabsTrigger>
                  <TabsTrigger value="goal" className="border-0 bg-black/10 px-4 py-2.5 outline-none">Goal Calculator</TabsTrigger>
                </TabsList>

                <TabsContent value="sip">
                  <SIPCalculator />
                </TabsContent>

                <TabsContent value="lumpsum">
                  <LumpsumCalculator />
                </TabsContent>

                <TabsContent value="advanced">
                  <AdvancedSIPCalculator />
                </TabsContent>

                <TabsContent value="goal">
                  <GoalCalculator />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-5xl mx-auto p-6">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What is a Systematic Investment Plan (SIP)?</h2>
            <p className="mb-4">A Systematic Investment Plan (SIP) is a disciplined investment strategy where you invest a fixed sum of money at regular intervals, typically in mutual funds. SIPs are designed to encourage regular savings and help individuals build wealth over time. Unlike a lump sum investment, SIPs allow you to contribute smaller, consistent amounts, making it an accessible option for all income levels.</p>

            <h3 className="text-xl font-semibold mb-2">Key Features of SIPs:</h3>
            <ul className="list-disc ml-6">
              <li className="mb-2"><strong>Frequency of Investment:</strong> Weekly, monthly, or quarterly.</li>
              <li className="mb-2"><strong>Flexibility:</strong> You can modify or stop SIPs based on financial needs.</li>
              <li className="mb-2"><strong>Rupee Cost Averaging:</strong> Reduces the impact of market volatility.</li>
              <li><strong>Power of Compounding:</strong> Earn returns not only on your principal amount but also on reinvested earnings.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What is a SIP Calculator?</h2>
            <p className="mb-4">A SIP calculator is an online tool that helps investors estimate the returns they can expect from their SIP investments. It allows you to plan your investments based on:</p>
            <ul className="list-disc ml-6">
              <li>Monthly SIP Amount</li>
              <li>Investment Duration</li>
              <li>Expected Annual Return Rate</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">Benefits of Using a SIP Calculator:</h3>
            <ul className="list-disc ml-6">
              <li className="mb-2">Quick estimates for investment planning.</li>
              <li className="mb-2">Visualization of financial growth over time.</li>
              <li>Helps compare investment strategies.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How Does a SIP Calculator Work?</h2>
            <p className="mb-4">The SIP calculator operates using a simple compound interest formula to compute the future value (FV) of your SIP investments:</p>
            <div className="bg-gray-200 p-4 rounded mb-4">
              <p className="font-mono">FV = P × [(1 + i)<sup>n</sup> - 1] / i × (1 + i)</p>
            </div>
            <ul className="list-disc ml-6">
              <li><strong>FV:</strong> Future Value (amount at maturity)</li>
              <li><strong>P:</strong> Monthly investment amount</li>
              <li><strong>i:</strong> Periodic rate of return (annual rate / 12)</li>
              <li><strong>n:</strong> Total number of SIP installments (years × 12)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">SIP Calculator vs. Lump Sum Calculator</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Criteria</th>
                    <th className="border border-gray-300 px-4 py-2">SIP</th>
                    <th className="border border-gray-300 px-4 py-2">Lump Sum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Investment Type</td>
                    <td className="border border-gray-300 px-4 py-2">Periodic</td>
                    <td className="border border-gray-300 px-4 py-2">One-time</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">Risk Management</td>
                    <td className="border border-gray-300 px-4 py-2">Reduces market volatility</td>
                    <td className="border border-gray-300 px-4 py-2">Exposed to market timing</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Flexibility</td>
                    <td className="border border-gray-300 px-4 py-2">High</td>
                    <td className="border border-gray-300 px-4 py-2">Limited</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">Compound Growth</td>
                    <td className="border border-gray-300 px-4 py-2">Gradual</td>
                    <td className="border border-gray-300 px-4 py-2">Immediate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-4">SIPs for Financial Goals</h2>
            <p className="mb-4">SIPs are ideal for achieving a variety of financial goals, such as:</p>
            <ul className="list-disc ml-6">
              <li className="mb-2"><strong>Retirement Planning:</strong> Build a substantial corpus for post-retirement life.</li>
              <li className="mb-2"><strong>Education Expenses:</strong> Save for children’s higher education.</li>
              <li className="mb-2"><strong>Wealth Creation:</strong> Generate long-term wealth through disciplined investing.</li>
              <li><strong>Emergency Fund:</strong> Create a safety net for unforeseen expenses.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Use SIP-Cal.com SIP Calculator?</h2>
            <ol className="list-decimal ml-6">
              <li className="mb-2"><strong>Input Monthly Investment:</strong> Enter the amount you plan to invest regularly.</li>
              <li className="mb-2"><strong>Set Investment Duration:</strong> Define the number of years you’ll stay invested.</li>
              <li className="mb-2"><strong>Expected Return Rate:</strong> Specify the annual return rate.</li>
              <li><strong>Get Results:</strong> View the estimated maturity amount, total investment, and returns.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">FAQs About SIP and SIP Calculators</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Q1: Are SIP returns guaranteed?</h3>
                <p>No, SIP returns depend on market performance and fund type.</p>
              </div>
              <div>
                <h3 className="font-bold">Q2: Can I stop SIPs anytime?</h3>
                <p>Yes, SIPs are flexible, allowing you to pause or stop investments.</p>
              </div>
              <div>
                <h3 className="font-bold">Q3: Do SIP calculators include taxes?</h3>
                <p>No, calculators typically exclude taxes, exit loads, and expense ratios.</p>
              </div>
              <div>
                <h3 className="font-bold">Q4: Are SIPs better than fixed deposits (FDs)?</h3>
                <p>While FDs offer guaranteed returns, SIPs often provide higher returns with market-linked risks.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose SIP-Cal.com?</h2>
            <p>At SIP-Cal.com, we provide intuitive tools and resources to help investors make informed decisions. Whether you’re planning for retirement or saving for your dream home, our SIP calculators simplify investment planning, ensuring a smoother journey toward financial freedom.</p>
            <p className="mt-4 font-bold">Explore our calculators today and take the first step in achieving your financial goals!</p>
          </section>
        </div>
      </main>
      <footer className="py-10 bg-black sm:pt-16 mt-32 lg:pt-24 w-full">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8 xl:gap-x-12">
            <div className="col-span-2 md:col-span-4 xl:pr-8">
              <div className="flex items-center justify-left gap-3">
                <Calculator className="h-8 w-8 text-white" />
                <h1 className="text-2xl font-bold text-white/80 dark:text-white">
                  SIP-CAL.COM
                </h1>
              </div>
              <p className="text-base leading-relaxed text-gray-600 mt-7">Discover how a SIP Calculator helps estimate returns on mutual fund investments. Learn its benefits, formula, and usage with our detailed guide.</p>
            </div>

            <div className="lg:col-span-2">
              <p className="text-base font-semibold text-white/80">Company</p>

              <ul className="mt-6 space-y-5">
                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> About </a>
                </li>

                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Features </a>
                </li>

                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Works </a>
                </li>

                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Career </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="text-base font-semibold text-white/80">Help</p>

              <ul className="mt-6 space-y-4">
                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Customer Support </a>
                </li>

                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Delivery Details </a>
                </li>

                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Terms & Conditions </a>
                </li>

                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Privacy Policy </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="text-base font-semibold text-white/80">Resources</p>

              <ul className="mt-6 space-y-5">
                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Free eBooks </a>
                </li>

                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Development Tutorial </a>
                </li>

                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> How to - Blog </a>
                </li>

                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> YouTube Playlist </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="text-base font-semibold text-white/80">Extra Links</p>

              <ul className="mt-6 space-y-5">
                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Customer Support </a>
                </li>

                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Delivery Details </a>
                </li>

                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Terms & Conditions </a>
                </li>

                <li>
                  <a href="#" title="" className="flex text-sm text-white/50 transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Privacy Policy </a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="mt-16 mb-10 border-gray-200" />

          <div className="sm:flex sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600">© Copyright 2024, All Rights Reserved by Cal-Com.com</p>

            <ul className="flex items-center mt-5 space-x-3 md:order-3 sm:mt-0">
              <li>
                <a
                  href="#"
                  title=""
                  className="flex items-center justify-center text-white/50 transition-all duration-200 bg-transparent border border-gray-300 rounded-full w-7 h-7 focus:bg-orange-600 hover:text-white focus:text-white hover:bg-orange-600 hover:border-blue-600 focus:border-blue-600"
                >
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                    ></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex items-center justify-center text-white/50 transition-all duration-200 bg-transparent border border-gray-300 rounded-full w-7 h-7 focus:bg-orange-600 hover:text-white focus:text-white hover:bg-orange-600 hover:border-blue-600 focus:border-blue-600"
                >
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex items-center justify-center text-white/50 transition-all duration-200 bg-transparent border border-gray-300 rounded-full w-7 h-7 focus:bg-orange-600 hover:text-white focus:text-white hover:bg-orange-600 hover:border-blue-600 focus:border-blue-600"
                >
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                    <circle cx="16.806" cy="7.207" r="1.078"></circle>
                    <path
                      d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"
                    ></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex items-center justify-center text-white/50 transition-all duration-200 bg-transparent border border-gray-300 rounded-full w-7 h-7 focus:bg-orange-600 hover:text-white focus:text-white hover:bg-orange-600 hover:border-blue-600 focus:border-blue-600"
                >
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}