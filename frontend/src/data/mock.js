import { Activity, TrendingUp, Database, Code, BarChart3, Brain } from 'lucide-react';
import React from 'react';

export const mockProjects = [
  {
    id: 1,
    title: 'Sprint Performance Profiling Using 40m Split Times',
    type: 'Analysis',
    summary: 'Performance breakdown using manually timed 40m sprint data with polynomial modeling and benchmark comparisons.',
    tools: ['Python', 'Polynomial Modeling', 'Benchmark Data'],
    keyInsight: 'The athlete showed significant lag in the first 20m (weak acceleration) and plateaued early with a peak velocity of only 6.96 m/s. The system identified specific deficits and offered targeted drills to enhance performance by phase.',
    details: [
      'Used 10m splits to break down sprint into acceleration, transition, and max velocity phases',
      'Calculated segment velocities and compared with sub-elite benchmarks',
      'Built logic-based recommendation system for individualized training',
      'Recommended sled sprints for acceleration, flying sprints for top-end speed'
    ],
    linkedinUrl: 'https://www.linkedin.com/posts/kathit-sondhi-3594b4281_i-broke-down-sprint-performance-using-just-activity-7334105788044431360-V4po'
  },
  {
    id: 2,
    title: 'Training Efficiency Analysis (5K Runners)',
    type: 'Data Visualization',
    summary: 'Analyzed 8 weeks of athlete training data using Pearson correlation to identify which zones relate to 5K performance.',
    tools: ['Python', 'Pandas', 'Matplotlib', 'Pearson Correlation'],
    keyInsight: 'Zone 5 training showed the highest (though weak) correlation with improvement, suggesting high-intensity work is critical for 5K performance.',
    linkedinUrl: 'https://www.linkedin.com/posts/kathit-sondhi-3594b4281_training-efficiency-analysis-using-pearson-activity-7323242274757201920-OcE1'
  },
  {
    id: 3,
    title: 'Heart Rate vs Power Output Analysis',
    type: 'Analysis',
    summary: 'Examined the relationship between heart rate and power output to identify performance efficiency and fatigue markers.',
    tools: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    keyInsight: 'Found that a rising heart rate does not always mean higher output. Visualized cardiac drift, indicating fatigue or inefficiency at certain load points.',
    details: [
      'Analyzed BPM vs watts across multiple training sessions',
      'Identified cardiac drift patterns indicating fatigue',
      'Created visualizations to examine performance efficiency',
      'Detected inefficiency markers at specific load points'
    ],
    linkedinUrl: 'https://www.linkedin.com/posts/kathit-sondhi-3594b4281_i-am-slowly-turning-into-a-bit-of-a-training-activity-7320771841139101697-Dslo'
  },
  {
    id: 4,
    title: 'Recovery Slope Index (RSI)',
    type: 'Analysis',
    summary: 'Python-based CMJ recovery tracking system analyzing countermovement jump data across 5 days post-load.',
    tools: ['Python', 'Pandas', 'Matplotlib'],
    keyInsight: 'RSI trends provide individualized readiness metrics where slope = recovery velocity and R² = confidence. Enables coaches to time heavy loading safely without lab equipment.',
    details: [
      'A001, A004: Rapid recovery (RSI ≈ +0.6–0.8 cm/day, R² > 0.95) - ready for high-intensity within 48-72h',
      'A002: Moderate recovery (+0.4 cm/day) - controlled return by day 4',
      'A003, A005: Negative slopes & low R² (< 0.25) - unclear recovery, retest + deload advised',
      'RSI captures rate of rebound in jump height, R² measures trend reliability'
    ],
    linkedinUrl: 'https://www.linkedin.com/posts/kathit-sondhi-3594b4281_recovery-slope-index-rsi-i-ran-an-analysis-activity-7350043247655682049-HgOd'
  },
  {
    id: 5,
    title: 'Fast-Bowler Workload Monitoring (BLI System)',
    type: 'Analysis',
    summary: 'Python-driven load monitoring prototype using Bowling Load Index (BLI) integrating volume, effort, and contextual factors.',
    tools: ['Python', 'Pandas', 'Matplotlib', 'NumPy'],
    keyInsight: 'Demonstrated how coaches can monitor workload using basic data + Python logic with no wearables, no cost, and fully customizable approach.',
    details: [
      'Z-Score flags sessions deviating > 2 SD from personal mean',
      'EWMA-based ACWR detects load spikes even in < 28 days of data',
      'Risk Flag Logic: High risk if ≥ 3 of (Z > 2, ACWR > 1.5, RPE ≥ 8, Recovery ≤ 5)',
      'Line graphs + heatmaps for "High Risk" sessions',
      'Adaptive thresholds using EWMA for early load management'
    ],
    linkedinUrl: 'https://www.linkedin.com/posts/kathit-sondhi-3594b4281_analysis-of-fast-bowler-workload-using-bli-activity-7337144468061523968-FV1K'
  },
  {
    id: 6,
    title: 'High-Speed Running Efficiency Analysis',
    type: 'Data Visualization',
    summary: 'GPS data analysis assessing how much of each player\'s total running distance occurs at high speeds.',
    tools: ['Python', 'Pandas', 'Matplotlib', 'GPS Data'],
    keyInsight: 'No player met the elite 20% HSR mark. Some fell in 10-20% range, several below 10%, indicating low high-speed workload and increased injury risk.',
    details: [
      'HSR Efficiency (%) = (HSR Distance / Total Distance) × 100',
      'HSR is a critical load marker for match readiness',
      'Insufficient sprinting leads to poor match readiness and injury risk'
    ],
    linkedinUrl: 'https://www.linkedin.com/posts/kathit-sondhi-3594b4281_much-awaited-gps-data-high-speed-running-activity-7321939963271348224-X5g8'
  },
  {
    id: 7,
    title: 'Fatigue Monitoring Analysis',
    type: 'Analysis',
    summary: 'Analyzed session quality to identify at what point the athlete was efficient by comparing internal vs external load.',
    tools: ['Python', 'Pandas', 'Matplotlib'],
    keyInsight: 'Observed a mismatch between rising internal load (HR/RPE) and stagnating or decreasing power output - a well-known sign of fatigue.',
    linkedinUrl: 'https://www.linkedin.com/posts/kathit-sondhi-3594b4281_fatigue-monitoring-in-this-short-term-activity-7316745840243486720-2cLD'
  },
  {
    id: 8,
    title: 'Force-Velocity Profiling',
    type: 'Analysis',
    summary: 'Performance profiling using Python-based linear regression modeling to identify athlete capabilities.',
    tools: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Linear Regression'],
    keyInsight: 'Successfully identified the athlete\'s max strength, max speed, and peak power zone through force-velocity relationship analysis.',
    linkedinUrl: 'https://www.linkedin.com/posts/kathit-sondhi-3594b4281_sportsscience-forcevelocity-powerprofile-activity-7314353823441944576-PvNG'
  },
  {
    id: 9,
    title: 'Training Load Monitoring with Z-Scores',
    type: 'Data Visualization',
    summary: 'Athlete load monitoring using statistical trend analysis to detect overload and underload patterns.',
    tools: ['Python', 'Pandas', 'NumPy', 'Seaborn', 'Matplotlib'],
    keyInsight: 'Z-score heatmap visualization enabled instant identification of athletes with repeated underload weeks or sudden load spikes, supporting individualized load monitoring.',
    details: [
      'Analyzed 12 weeks of High-Speed Running and Acceleration Count data',
      'Compared each week against rolling 3-week average and standard deviation',
      'Built heatmap visualization for coaches to spot trends instantly',
      'Supports individualized load monitoring without fixed thresholds',
      'Promotes proactive decision-making in team programming'
    ],
    linkedinUrl: 'https://www.linkedin.com/posts/kathit-sondhi-3594b4281_detecting-overload-underload-in-athletes-activity-7326308965116461061-3_6v'
  }
];

export const mockQualifications = [
  {
    title: 'UKSCA Accredited Strength & Conditioning Trainer',
    institution: 'UK Strength and Conditioning Association'
  },
  {
    title: 'BSc in Strength & Conditioning',
    institution: 'Setanta College',
    status: 'Pursuing'
  }
];

export const mockSpecializations = [
  {
    icon: React.createElement(Activity, { size: 24 }),
    title: 'Strength & Conditioning',
    description: 'Evidence-based training programs for athletic performance enhancement'
  },
  {
    icon: React.createElement(TrendingUp, { size: 24 }),
    title: 'Sports Data Analysis',
    description: 'Analyzing GPS, heart rate, session RPE, and lactate data for insights'
  },
  {
    icon: React.createElement(Database, { size: 24 }),
    title: 'Athlete Monitoring',
    description: 'Creating actionable dashboards and reports using Python'
  },
  {
    icon: React.createElement(BarChart3, { size: 24 }),
    title: 'Performance Analytics',
    description: 'Using data to measure, understand, and improve performance'
  },
  {
    icon: React.createElement(Brain, { size: 24 }),
    title: 'Machine Learning',
    description: 'Exploring ML for injury prediction and adaptation modeling'
  },
  {
    icon: React.createElement(Code, { size: 24 }),
    title: 'Data Visualization',
    description: 'Building clear, actionable visualizations for coaches and athletes'
  }
];

export const mockTools = [
  'Python (Pandas, Matplotlib, Seaborn, NumPy)',
  'AI/ML Integration',
  'Statistical Analysis'
];