import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Statistics() {
  const black = '#111827';

  const modelPerformance = {
    labels: ['Accuracy', 'Precision', 'Recall'],
    datasets: [
      {
        label: 'Score (%)',
        data: [87, 84, 81],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
        borderRadius: 5,
      },
    ],
  };

  const featureImportance = {
    labels: [
      'Age', 'Cholesterol', 'Resting BP', 'Chest Pain', 'Max HR',
      'Oldpeak', 'ST Slope', 'FBS', 'Sex', 'Thal', 'CA', 'RestECG', 'ExAng'
    ],
    datasets: [
      {
        label: 'Importance',
        data: [0.14, 0.12, 0.11, 0.1, 0.09, 0.08, 0.08, 0.07, 0.06, 0.05, 0.05, 0.03, 0.02],
        backgroundColor: '#6366f1',
      },
    ],
  };

  const ageDistribution = {
    labels: ['<30', '30-40', '40-50', '50-60', '60-70', '70+'],
    datasets: [
      {
        label: 'Number of Patients',
        data: [12, 45, 76, 89, 54, 18],
        backgroundColor: '#f87171',
      },
    ],
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem 1rem',
        fontFamily: "'Poppins', sans-serif",
        background: 'linear-gradient(135deg, #a5b4fc, #3b82f6, #1e3a8a)',
        backgroundAttachment: 'fixed',
        color: black,
      }}
    >
      <div className="container">
        <div className="text-center text-white mb-5">
          <h2 className="fw-bold">Statistics & Insights</h2>
          <p className="fs-5">Visual overview of model performance and heart health patterns</p>
        </div>

        <div className="row g-5 mb-4">
          <div className="col-md-6">
            <div className="p-4 rounded-4 shadow-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>
              <h5 className="fw-bold text-center mb-3">Model Performance</h5>
              <Bar data={modelPerformance} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 rounded-4 shadow-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>
              <h5 className="fw-bold text-center mb-3">Feature Importance</h5>
              <Bar
                data={featureImportance}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: { x: { beginAtZero: true, max: 0.2 } },
                }}
              />
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-8 mx-auto">
            <div className="p-4 rounded-4 shadow-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>
              <h5 className="fw-bold text-center mb-3">Age Distribution of Patients</h5>
              <Bar data={ageDistribution} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
