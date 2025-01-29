"use client";

import { useGetTasksAmount } from "@/hooks/mutations/use-tasks.hook";
import { useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Label, Pie, PieChart } from "recharts";

const TasksChartFetcher = () => {
  const { data } = useGetTasksAmount();

  const { statistics, total } = useMemo(() => {
    if (!data) {
      return {
        statistics: [],
        total: 0,
      };
    }

    const statistics = data.map((item) => ({
      name: item.name,
      amount: item._count.tasks,
      fill: item.color,
    }));

    return {
      statistics,
      total: statistics.reduce((sum, current) => sum + current.amount, 0),
    };
  }, [data]);

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Tasks Created</CardTitle>
        <CardDescription>
          Gathered tasks for the period of all time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={statistics}
              dataKey="amount"
              nameKey="name"
              innerRadius={50}
              strokeWidth={5}
              outerRadius="100%"
              paddingAngle={0}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export { TasksChartFetcher };
