"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";  // Import Switch from ShadCN
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement);

export function AdvancedSIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(12);
  const [stepUpRate, setStepUpRate] = useState(10);
  const [inflationEnabled, setInflationEnabled] = useState(false);  // State to handle inflation toggle
  const [results, setResults] = useState({
    totalInvestment: 0,
    totalReturns: 0,
    maturityAmount: 0,
    yearlyBreakdown: [] as { year: number; amount: number; investment: number }[]
  });

  const averageInflationRate = 6 / 100;  // Set average inflation rate (6%)

  const calculateStepUpSIP = () => {
    let totalInvestment = 0;
    let maturityAmount = 0;
    const yearlyBreakdown: { year: number; amount: number; investment: number }[] = [];
    const monthlyRate = returnRate / 12 / 100;
  
    let currentMonthlyInvestment = monthlyInvestment;
  
    for (let year = 1; year <= years; year++) {
      let yearlyInvestment = 0;
      let yearEndAmount = 0;
  
      // Loop through each month of the year
      for (let month = 1; month <= 12; month++) {
        totalInvestment += currentMonthlyInvestment;
        yearlyInvestment += currentMonthlyInvestment;
  
        // Calculate maturity for this month's investment
        const monthsRemaining = (years - year) * 12 + (12 - month + 1); // Remaining months from this point
        yearEndAmount += currentMonthlyInvestment * Math.pow(1 + monthlyRate, monthsRemaining);
  
        if (inflationEnabled) {
          // Adjust current monthly investment for inflation
          currentMonthlyInvestment *= (1 + averageInflationRate / 12);
        }
      }
  
      // After each year, step-up the monthly investment
      currentMonthlyInvestment *= (1 + stepUpRate / 100);
  
      yearlyBreakdown.push({
        year,
        amount: yearEndAmount,
        investment: yearlyInvestment,
      });
  
      maturityAmount += yearEndAmount; // Accumulate the yearly contributions
    }
  
    const totalReturns = maturityAmount - totalInvestment;
  
    setResults({
      totalInvestment,
      totalReturns,
      maturityAmount,
      yearlyBreakdown,
    });
  };
  
  useEffect(() => {
    calculateStepUpSIP();
  }, [monthlyInvestment, years, returnRate, stepUpRate, inflationEnabled]);  // Include inflationEnabled as a dependency

  const doughnutData = {
    labels: ['Total Investment', 'Total Returns'],
    datasets: [{
      data: [results.totalInvestment, results.totalReturns],
      backgroundColor: ['#0ea5e9', '#22c55e'],
      borderColor: ['#0284c7', '#16a34a'],
      borderWidth: 1
    }]
  };

  const barData = {
    labels: results.yearlyBreakdown.map(item => `Year ${item.year}`),
    datasets: [
      {
        label: 'Portfolio Value',
        data: results.yearlyBreakdown.map(item => item.amount),
        backgroundColor: '#0ea5e9',
        borderRadius: 8,
      },
      {
        label: 'Yearly Investment',
        data: results.yearlyBreakdown.map(item => item.investment),
        backgroundColor: '#22c55e',
        borderRadius: 8,
      },
    ],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="monthlyInvestment" className="text-white/50">Initial Monthly Investment</Label>
              <Input
                id="monthlyInvestment"
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-24 text-right"
              />
            </div>
            <Slider
              value={[monthlyInvestment]}
              onValueChange={([value]) => setMonthlyInvestment(value)}
              min={500}
              max={100000}
              step={500}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="stepUpRate" className="text-white/50">Yearly Step-up Rate (%)</Label>
              <Input
                id="stepUpRate"
                type="number"
                value={stepUpRate}
                onChange={(e) => setStepUpRate(Number(e.target.value))}
                className="w-24 text-right"
              />
            </div>
            <Slider
              value={[stepUpRate]}
              onValueChange={([value]) => setStepUpRate(value)}
              min={0}
              max={50}
              step={1}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="years" className="text-white/50">Investment Period (Years)</Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-24 text-right"
              />
            </div>
            <Slider
              value={[years]}
              onValueChange={([value]) => setYears(value)}
              min={1}
              max={30}
              step={1}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="returnRate" className="text-white/50">Expected Return Rate (%)</Label>
              <Input
                id="returnRate"
                type="number"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-24 text-right"
              />
            </div>
            <Slider
              value={[returnRate]}
              onValueChange={([value]) => setReturnRate(value)}
              min={1}
              max={30}
              step={0.5}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white/50">Enable Inflation Adjustment</Label>
              <Switch
                checked={inflationEnabled}
                onCheckedChange={(checked) => setInflationEnabled(checked)}
              />
            </div>
            {inflationEnabled && (
              <p className="text-sm text-white/20">Average Inflation Rate: 6%</p>
            )}
          </div>
        </div>

        <Card className="p-6 rounded-xl border-0 bg-black/10 outline-none">
          <h3 className="text-lg font-semibold mb-4 text-white">Investment Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-white/50">Total Investment:</span>
              <span className="font-semibold text-white">{formatCurrency(results.totalInvestment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Total Returns:</span>
              <span className="font-semibold text-green-600">{formatCurrency(results.totalReturns)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Maturity Amount:</span>
              <span className="font-semibold text-white">{formatCurrency(results.maturityAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Final Monthly Investment:</span>
              <span className="font-semibold text-white">
                {formatCurrency(monthlyInvestment * Math.pow(1 + stepUpRate / 100, years - 1))}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white/50">Investment Breakdown</h3>
          <div className="h-[300px] flex items-center justify-center text-white">
            <Doughnut
              data={doughnutData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Year-wise Growth</h3>
          <div className="h-[300px] text-white">
            <Bar
              data={barData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Amount (INR)',
                    },
                  },
                },
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
