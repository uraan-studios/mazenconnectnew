"use client"

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"

const CampaignsResult = () => {
    return  (

    <Card className="">
        <CardHeader>
            <CardTitle>Campaigns Result</CardTitle>
            <CardDescription>Module not Functional Yet</CardDescription>
        </CardHeader>
      <CardContent className="flex gap-4 p-4 pb-2">
        <ChartContainer
          config={{
            move: {
              label: "Move",
              color: "hsl(var(--chart-1))",
            },
            stand: {
              label: "Stand",
              color: "hsl(var(--chart-2))",
            },
            exercise: {
              label: "Exercise",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[140px] w-full"
        >
          <BarChart
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 10,
            }}
            data={[
              {
                activity: "Spendings",
                value: (50/100) * 100,
                label: "15k Rs",
                fill: "var(--color-stand)",
              },
              {
                activity: "Queries",
                value: (46 / 60) * 100,
                label: "92 Leads",
                fill: "var(--color-exercise)",
              },
              {
                activity: "Matured",
                value: (245 / 360) * 100,
                label: "62 Leads",
                fill: "var(--color-move)",
              },
            ]}
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="activity"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="value" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Spendings</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              15k
              <span className="text-sm font-normal text-muted-foreground">
                Rs
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Queries</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              92
              <span className="text-sm font-normal text-muted-foreground">
                Leads
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Matured</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              62
              <span className="text-sm font-normal text-muted-foreground">
                Leads
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}


export default CampaignsResult