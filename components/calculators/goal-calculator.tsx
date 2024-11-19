"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement);

export function GoalCalculator() {
  const [goalAmount, setGoalAmount] = useState(1000000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(12);
  const [calculationType, setCalculationType] = useState<'sip' | 'lumpsum'>('sip');
  const [results, setResults] = useState({
    requiredInvestment: 0,
    totalInvestment: 0,
    totalReturns: 0,
    yearlyBreakdown: [] as { year: number; amount: number }[]
  });

  const calculateRequiredInvestment = () => {
    let requiredInvestment = 0;
    let yearlyBreakdown: { year: number; amount: number }[] = [];

    if (calculationType === 'sip') {
      const monthlyRate = returnRate / 12 / 100;
      const months = years * 12;
      requiredInvestment = (goalAmount * monthlyRate) / ((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate));

      yearlyBreakdown = Array.from({ length: years }, (_, index) => {
        const year = index + 1;
        const monthsCompleted = year * 12;
        const amount = requiredInvestment * ((Math.pow(1 + monthlyRate, monthsCompleted) - 1) / monthlyRate) * (1 + monthlyRate);
        return { year, amount };
      });
    } else {
      requiredInvestment = goalAmount / Math.pow(1 + returnRate / 100, years);

      yearlyBreakdown = Array.from({ length: years }, (_, index) => {
        const year = index + 1;
        const amount = requiredInvestment * Math.pow(1 + returnRate / 100, year);
        return { year, amount };
      });
    }

    const totalInvestment = calculationType === 'sip' ? requiredInvestment * 12 * years : requiredInvestment;
    const totalReturns = goalAmount - totalInvestment;

    setResults({
      requiredInvestment,
      totalInvestment,
      totalReturns,
      yearlyBreakdown
    });
  };

  useEffect(() => {
    calculateRequiredInvestment();
  }, [goalAmount, years, returnRate, calculationType]);

  const doughnutData = {
    labels: ['Total Investment', 'Total Returns'],
    datasets: [{
      data: [results.totalInvestment, results.totalReturns],
      backgroundColor: ['#0ea5e9', '#22c55e'],
      borderColor: ['#0284c7', '#16 <boltAction type="file" filePath="components/calculators/goal-calculator.tsx">a34a'],
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
        label: 'Total Investment',
        data: results.yearlyBreakdown.map((_, index) =>
          calculationType === 'sip' ? results.requiredInvestment * 12 * (index + 1) : results.totalInvestment
        ),
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
          <Tabs value={calculationType} onValueChange={(value) => setCalculationType(value as 'sip' | 'lumpsum')}>
            <TabsList className="grid w-full grid-cols-2 rounded-xl border-0 bg-black/10 p-2 outline-none gap-2">
              <TabsTrigger value="sip" className="border-0 bg-black/10 px-4 py-2.5 outline-none">SIP Investment</TabsTrigger>
              <TabsTrigger value="lumpsum" className="border-0 bg-black/10 px-4 py-2.5 outline-none">Lumpsum Investment</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="goalAmount" className="text-white/50">Target Amount</Label>
              <Input
                id="goalAmount"
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value))}
                className="w-24 text-right"
              />
            </div>
            <Slider
              value={[goalAmount]}
              onValueChange={([value]) => setGoalAmount(value)}
              min={100000}
              max={10000000}
              step={100000}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="years" className="text-white/50">Time Horizon (Years)</Label>
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
        </div>

        <Card className="p-6 rounded-xl border-0 bg-black/10 outline-none">
          <h3 className="text-lg font-semibold mb-4 text-white">Goal Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-white/50">Required {calculationType === 'sip' ? 'Monthly' : 'One-time'} Investment:</span>
              <span className="font-semibold text-white">{formatCurrency(results.requiredInvestment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Total Investment:</span>
              <span className="font-semibold text-white">{formatCurrency(results.totalInvestment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Total Returns:</span>
              <span className="font-semibold text-green-600">{formatCurrency(results.totalReturns)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Goal Amount:</span>
              <span className="font-semibold text-white">{formatCurrency(goalAmount)}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Investment Breakdown</h3>
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