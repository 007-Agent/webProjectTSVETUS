import { display } from 'html2canvas/dist/types/css/property-descriptors/display'
import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

function Grafiki() {
  const [temperatures, setTemperatures] = useState([
    { day: 1, temp: 40 },
    { day: 2, temp: 37 },
    { day: 3, temp: 38.5 }
  ])
  const [inputTemp, setInputTemp] = useState('')
  const [dayCount, setDayCount] = useState(4)

  const addTemperature = () => {
    const newTemp = parseFloat(inputTemp)
    if (!isNaN(newTemp)) {
      setTemperatures([...temperatures, { day: dayCount, temp: newTemp }])
      setDayCount(dayCount + 1)
      setInputTemp('')
    }
  }

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>График температуры пациента</h2>

      {/* Поле ввода и кнопка */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type='number'
          value={inputTemp}
          onChange={e => setInputTemp(e.target.value)}
          placeholder='Введите температуру'
        />
        <button onClick={addTemperature} style={{ marginLeft: '10px' }}>
          Добавить
        </button>
      </div>

      {/* График */}
      <ResponsiveContainer>
        <LineChart
          data={temperatures}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid stroke='black' />

          {/* Ось X - дни */}
          <XAxis
            dataKey='day'
            label={{ value: 'День', position: 'insideBottom', offset: -5 }}
          />

          {/* Ось Y - температура */}
          <YAxis
            domain={[35, 42]} // диапазон температур
            label={{
              value: 'Температура (°C)',
              angle: -90,
              position: 'insideLeft'
            }}
          />

          {/* Всплывающая подсказка */}
          <Tooltip />

          {/* Легенда (если необходимо) */}
          <Legend />

          {/* Линия графика */}
          <Line
            type='monotone'
            dataKey='temp'
            // stroke='#ff7300'
            stroke='black'
            strokeWidth={3}
            // dot={{ r: 5, stroke: "black", strokeWidth: 2, fill: "white" }} // точки
            // activeDot={{ r: 8 }}
            // connectNulls // если есть пропуски, соединит линию
            isAnimationActive={true}
            // fill="#ffe5b4" // заливка под линией (опционально)
            fill='black'
            strokeLinecap='round'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Grafiki
