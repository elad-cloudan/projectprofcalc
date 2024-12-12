import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProfitabilityCalculator = () => {
  const [projectPrice, setProjectPrice] = useState('');
  const [projectCosts, setProjectCosts] = useState('');
  const [profit, setProfit] = useState(null);
  const [profitPercentage, setProfitPercentage] = useState(null);

  const calculateProfitability = () => {
    const price = parseFloat(projectPrice);
    const costs = parseFloat(projectCosts);

    if (isNaN(price) || isNaN(costs)) {
      alert('אנא הזן מספרים תקינים');
      return;
    }

    const calculatedProfit = price - costs;
    const calculatedProfitPercentage = (calculatedProfit / price) * 100;

    setProfit(calculatedProfit);
    setProfitPercentage(calculatedProfitPercentage);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>מחשבון רווחיות פרויקט</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">סכום תמחור הפרויקט</label>
            <Input 
              type="number" 
              value={projectPrice} 
              onChange={(e) => setProjectPrice(e.target.value)}
              placeholder="הזן את סכום התמחור"
            />
          </div>
          <div>
            <label className="block mb-2">עלויות הפרויקט</label>
            <Input 
              type="number" 
              value={projectCosts} 
              onChange={(e) => setProjectCosts(e.target.value)}
              placeholder="הזן את העלויות"
            />
          </div>
          <Button 
            onClick={calculateProfitability}
            className="w-full"
          >
            חשב רווחיות
          </Button>

          {profit !== null && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p>רווח נקי: {profit.toFixed(2)} ₪</p>
              <p>אחוז רווח: {profitPercentage.toFixed(2)}%</p>
              <div 
                className={`mt-2 p-2 rounded ${
                  profitPercentage > 20 
                    ? 'bg-green-200' 
                    : profitPercentage > 10 
                    ? 'bg-yellow-200' 
                    : 'bg-red-200'
                }`}
              >
                {profitPercentage > 20 
                  ? 'רווחיות מעולה!' 
                  : profitPercentage > 10 
                  ? 'רווחיות סבירה' 
                  : 'רווחיות נמוכה'}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfitabilityCalculator;
