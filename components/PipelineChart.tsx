import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

interface PipelineChartProps {
  data: {
    sourced: number
    qualified: number
    outreach: number
    response: number
    loi: number
    closed: number
  }
}

export default function PipelineChart({ data }: PipelineChartProps) {
  const chartData = [
    { name: 'Sourced', value: data.sourced },
    { name: 'Qualified', value: data.qualified },
    { name: 'Outreach', value: data.outreach },
    { name: 'Response', value: data.response },
    { name: 'LOI', value: data.loi },
    { name: 'Closed', value: data.closed },
  ].filter(d => d.value > 0)

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-lg font-semibold mb-4">Pipeline Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {chartData.map((item, idx) => (
          <div key={item.name} className="text-center">
            <div
              className="w-4 h-4 rounded-full mx-auto mb-2"
              style={{ backgroundColor: COLORS[idx % COLORS.length] }}
            ></div>
            <div className="text-sm text-gray-400">{item.name}</div>
            <div className="text-2xl font-bold">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
