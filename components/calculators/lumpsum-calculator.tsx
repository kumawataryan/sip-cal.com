"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement);

export function LumpsumCalculator() {
  const [investment, setInvestment] = useState(100000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(12);
  const [results, setResults] = useState({
    totalInvestment: 0,
    totalReturns: 0,
    maturityAmount: 0,
    yearlyBreakdown: [] as { year: number; amount: number }[]
  });

  const calculateLumpsum = () => {
    const maturityAmount = investment * Math.pow(1 + returnRate / 100, years);
    const totalReturns = maturityAmount - investment;

    const yearlyBreakdown = Array.from({ length: years }, (_, index) => {
      const year = index + 1;
      const amount = investment * Math.pow(1 + returnRate / 100, year);
      return { year, amount };
    });

    setResults({
      totalInvestment: investment,
      totalReturns,
      maturityAmount,
      yearlyBreakdown
    });
  };

  useEffect(() => {
    calculateLumpsum();
  }, [investment, years, returnRate]);

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
        label: 'Initial Investment',
        data: results.yearlyBreakdown.map(() => investment),
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
              <Label htmlFor="investment" className="text-white/50">One-time Investment</Label>
              <Input
                id="investment"
                type="number"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-24 text-right"
              />
            </div>
            <Slider
              value={[investment]}
              onValueChange={([value]) => setInvestment(value)}
              min={1000}
              max={10000000}
              step={1000}
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