import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { name: "Received", value: 1500, fill: "#A7B8D9" },
  { name: "Retry", value: 200, fill: "#1B2A48" },
  { name: "Failed", value: 191, fill: "#E61B23" },
  { name: "Skipped", value: 100, fill: "#2563EB" },
]

export default function MessageStatus() {
  const totalMessages = chartData.reduce((acc, curr) => acc + curr.value, 0)

  const failedReasons = [
    { error: "Error from Whatsapp: Message not delivered", count: 123 },
    { error: "Error from Whatsapp: Message not delivered", count: 123 },
    { error: "Error from Whatsapp: Message not delivered", count: 123 },
    { error: "Error from Whatsapp: Rate limit exceeded", count: 89 },
    { error: "Error from Whatsapp: Invalid phone number", count: 67 },
    { error: "Error from Whatsapp: User not found", count: 45 },
  ]

  const skippedReasons = [
    { error: "Invalid phone number format", count: 78 },
    { error: "Missing required template parameters", count: 56 },
    { error: "Template not approved", count: 34 },
    { error: "Business account not verified", count: 23 },
  ]

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

  return (
    <div className=" p-4 w-1/2">
      <Card className="text-white bg-transparent border-primary">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-lg font-normal">Message delivery status</CardTitle>
          <p className="text-2xl font-semibold text-red-500">
            {totalMessages.toLocaleString()} <span className="text-sm font-normal text-zinc-400">messages sent</span>
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex gap-10">
            <ChartContainer config={chartConfig} className="h-[250px] w-[300px]">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="46%"
                  innerRadius={70}
                  outerRadius={110}
                />
              </PieChart>
            </ChartContainer>
            <div className="flex flex-col gap-4 pt-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-sm text-zinc-400">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <Tabs defaultValue="failed" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-transparent">
              <TabsTrigger value="failed" >Failed Reasons</TabsTrigger>
              <TabsTrigger value="skipped">Skipped Reasons</TabsTrigger>
            </TabsList>
            <TabsContent value="failed">
              <ScrollArea className="h-[200px] w-full  border-none border p-4 no-scrollbar">
                <div className="space-y-3">
                  {failedReasons.map((item, index) => (
                    <div key={index} className="flex items-start justify-between gap-4">
                      <div className="text-sm">
                        {index + 1}. {item.error}
                      </div>
                      <div className="text-sm text-zinc-400">{item.count}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="skipped">
              <ScrollArea className="h-[200px]  border-none w-full  border p-4 no-scrollbar">
                <div className="space-y-3">
                  {skippedReasons.map((item, index) => (
                    <div key={index} className="flex items-start justify-between gap-4">
                      <div className="text-sm">
                        {index + 1}. {item.error}
                      </div>
                      <div className="text-sm text-zinc-400">{item.count}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}