import React, { useState, useEffect } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Sector,
} from "recharts";
import {
    countStatusOccurrences,
    formatStatusCounts,
    getUniqueStatuses,
} from "./ChartCalc";

/* Highlight renderer — unchanged */
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;

  const borderColor = payload.borderColor || "#000"; // fallback if not provided

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.showText}
      </text>

      {/* Main highlighted sector */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius-5}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      {/* Outer border ring using borderColor */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={borderColor}
      />

      {/* Arrow callout */}
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} />
      <text
        x={ex + (cos >= 0 ? 12 : -12)}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {`${value} (${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

const StatusPieChart = ({ rawData }) => {
    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);   // always keep one slice active
    // console.log("activeIndex", activeIndex);
    // console.log("data", data);

    /* build chart data */
    useEffect(() => {
        const unique = getUniqueStatuses(rawData);
        const counts = countStatusOccurrences(rawData, unique);
        setData(formatStatusCounts(counts));
        setActiveIndex(0);               // highlight first slice after rebuild
    }, [rawData]);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart
                /* When the pointer leaves the **whole chart**, re‑highlight current (or 0) */
                onMouseLeave={() =>
                    setActiveIndex((prev) => (prev == null ? 0 : prev))
                }
            >
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="showText"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    onMouseEnter={(_, idx) => setActiveIndex(idx)}  // hover sets highlight
                    label={({ showText, percent }) =>
                        `${showText} (${(percent * 100).toFixed(0)}%)`
                    }
                    // isAnimationActive={false}
                >
                    {data.map((entry) => (
                        <Cell key={entry.status} fill={entry.color} />
                    ))}
                </Pie>

                <Tooltip
                    formatter={(value, name, props) => [
                        `${value}`,
                        props.payload.showText,
                    ]}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default StatusPieChart;
