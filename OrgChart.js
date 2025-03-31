import React from "react";
import orgChartData from "./OrgChartData";
import "./OrgChart.css";

const OrgChart = () => {
  return (
    <div className="org-chart-container">
      <h2>Organizational Chart</h2>
      <div className="org-chart">
        {orgChartData.map((director) => (
          <div key={director.id} className="director">
            <div className="director-box">{director.name}</div>
            <div className="interns">
              {director.interns.map((intern) => (
                <div key={intern.id} className="intern-box">
                  {intern.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgChart;
