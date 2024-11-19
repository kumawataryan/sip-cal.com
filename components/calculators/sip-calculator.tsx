"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

export function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(12);
  const [results, setResults] = useState({
    totalInvestment: 0,
    totalReturns: 0,
    maturityAmount: 0,
    yearlyBreakdown: [] as { year: number; amount: number }[]
  });

  const calculateSIP = () => {
    const monthlyRate = returnRate / 12 / 100;
    const months = years * 12;
    const maturityAmount = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = monthlyInvestment * months;
    const totalReturns = maturityAmount - totalInvestment;

    const yearlyBreakdown = Array.from({ length: years }, (_, index) => {
      const year = index + 1;
      const monthsCompleted = year * 12;
      const amount = monthlyInvestment * ((Math.pow(1 + monthlyRate, monthsCompleted) - 1) / monthlyRate) * (1 + monthlyRate);
      return { year, amount };
    });

    setResults({
      totalInvestment,
      totalReturns,
      maturityAmount,
      yearlyBreakdown
    });
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, years, returnRate]);

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
        borderRadius: 8
      },
      {
        label: 'Cumulative Investment',
        data: results.yearlyBreakdown.map(item => monthlyInvestment * item.year * 12),
        backgroundColor: '#22c55e',
        borderRadius: 8
      }
    ]
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
              <Label htmlFor="monthlyInvestment" className="text-white/50">Monthly Investment</Label>
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
                    beginAtZero: true
                  }
                },
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}