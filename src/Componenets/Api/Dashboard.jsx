import { ArrowUp ,Users,DollarSign ,Percent,Image,Code,Wallet,ArrowLeftRight} from 'lucide-react';
import './Dashboard.css';

const newUsersByMonth = [
    { month: 'Feb', value: 4.5 },
    { month: 'Mar', value: 4.9 },
    { month: 'Apr', value: 2.6 },
    { month: 'May', value: 4.1 },
    { month: 'Jun', value: 1.8 },
    { month: 'Jul', value: 3.0 },
];

const userActivityByDay = [
    { name: 'February', color: '#ff8a00', values: [1.5, 2.4, 1.1, 2.1, 2.7, 3.8, 1.5, 3.0, 2.2, 1.6, 1.1, 2.0, 3.5, 2.5, 1.1] },
    { name: 'March', color: '#20a8ff', values: [1.8, 2.1, 2.7, 3.1, 2.8, 4.0, 3.5, 2.5, 3.2, 3.0, 3.2, 2.8, 3.0, 2.7, 4.0] },
    { name: 'April', color: '#a100e8', values: [2.4, 3.1, 2.9, 3.5, 4.0, 3.6, 4.0, 4.1, 3.8, 4.0, 4.1, 5.0, 4.6, 5.3, 5.8] },
    { name: 'May', color: '#26c878', values: [3.0, 4.9, 4.0, 4.5, 5.7, 4.6, 5.2, 4.5, 5.1, 4.7, 5.4, 5.6, 5.2, 5.9, 6.8] },
];

const chartY = (value) => 215 - (value / 7) * 160;
const chartX = (index) => 455 + index * (405 / 14);

function Dashboard(){
    return (
        <section className="dashboard_page">
            <div className="Users_Box">
             <div><Users/></div>
              <div className="total_users">
                Users
               </div>
              <div className="total_count">430</div>
              <div className="Total_days">Last 30 days</div>
              <h4><ArrowUp/>32.54 <Percent/> </h4>
            </div>

            <div className="Subscription">
                <div><DollarSign/></div>
                <div className="Total_Subscription"> Subscription</div>
                <div className="Count_Subscription"> 360 </div>
                 <div className="Total_days">Last 30 days</div>
                 <h4><ArrowUp/>32.54<Percent/></h4>
            </div>

            <div className="Generated_img">
                <div><Image/></div>
                <div className="Total_img"> Generated_Image</div>
                <div className="Count_img"> 43291 </div>
                 <div className="Total_days">Last 30 days</div>
                 <h4><ArrowUp/>32.54<Percent/></h4>
            </div>

            <div className="Generated_Code">
                <div><Code/></div>
                <div className="Total_Code"> Generated_Code</div>
                <div className="Count_Code"> 34567 </div>
                 <div className="Total_days">Last 30 days</div>
                 <h4><ArrowUp/>32.54<Percent/></h4>
            </div>

            <div className="Total_Income">
                <div><Wallet/></div>
                <div className="Total_Money">Total_income</div>
                <div className="Count_Total_Money"> <DollarSign/>36,180K </div>
                 <div className="Total_days">Last 30 days</div>
                 <h4><ArrowUp/>32.54<Percent/></h4>
            </div>

            <div className="Transaction">
                <div><ArrowLeftRight/></div>
                <div className="Total_Transaction">Total_Transaction</div>
                <div className="Count_Transaction"> <DollarSign/>38,180K </div>
                 <div className="Total_days">Last 30 days</div>
                 <h4><ArrowUp/>32.54<Percent/></h4>
            </div>

            <svg
                viewBox="0 0 900 300"
                width="100%"
                height="300"
                role="img"
                aria-label="New users charts: monthly bar chart and daily activity line chart"
            >
                <rect x="0" y="0" width="390" height="270" rx="14" fill="#ffffff" />
                <rect x="405" y="0" width="495" height="270" rx="14" fill="#ffffff" />

                <text x="20" y="28" fill="#393550" fontSize="15" fontWeight="700">
                    Total New Users
                </text>
                <rect x="305" y="10" width="68" height="23" rx="7" fill="#f3f4f6" />
                <text x="315" y="25" fill="#777984" fontSize="10">6 months⌄</text>

                {[7, 6, 5, 4, 3, 2, 1].map((tick) => {
                    const y = chartY(tick);
                    return (
                        <g key={`monthly-axis-${tick}`}>
                            <text x="17" y={y + 3} fill="#a0a1ad" fontSize="10">{tick}k</text>
                            <line x1="44" y1={y} x2="375" y2={y} stroke="#f0f0f4" />
                        </g>
                    );
                })}

                {newUsersByMonth.map((item, index) => {
                    const x = 56 + index * 51;
                    const height = (item.value / 7) * 160;
                    const isHighlighted = item.month === 'Mar';
                    return (
                        <g key={item.month}>
                            <rect
                                x={x}
                                y={215 - height}
                                width="39"
                                height={height}
                                rx="9"
                                fill={isHighlighted ? '#9632ff' : '#f0e5ff'}
                            />
                            <text x={x + 19.5} y="231" textAnchor="middle" fill="#8d8e9b" fontSize="10">
                                {item.month}
                            </text>
                        </g>
                    );
                })}

                <rect x="51" y="47" width="130" height="43" rx="7" fill="#111d35" />
                <text x="61" y="63" fill="#ffffff" fontSize="9">New User: 4.9K</text>
                <text x="61" y="78" fill="#41dc90" fontSize="9">↑ 49% than last month</text>
                <path d="M 111 90 L 121 90 L 116 96 Z" fill="#111d35" />
                <rect x="119" y="252" width="9" height="9" rx="3" fill="#9632ff" />
                <text x="134" y="260" fill="#777984" fontSize="10">Total New Registered Users</text>

                <text x="425" y="28" fill="#393550" fontSize="15" fontWeight="700">
                    Total New Users
                </text>
                <rect x="818" y="10" width="67" height="23" rx="7" fill="#f3f4f6" />
                <text x="830" y="25" fill="#777984" fontSize="10">15 days⌄</text>

                {[7, 6, 5, 4, 3, 2, 1].map((tick) => {
                    const y = chartY(tick);
                    return (
                        <g key={`daily-axis-${tick}`}>
                            <text x="413" y={y + 3} fill="#a0a1ad" fontSize="10">{tick}k</text>
                            <line x1="443" y1={y} x2="880" y2={y} stroke="#f0f0f4" />
                        </g>
                    );
                })}

                {Array.from({ length: 15 }, (_, index) => (
                    <text
                        key={`day-${index + 1}`}
                        x={chartX(index)}
                        y="231"
                        textAnchor="middle"
                        fill="#8d8e9b"
                        fontSize="9"
                    >
                        {index + 1}
                    </text>
                ))}

                {userActivityByDay.map((series) => {
                    const points = series.values
                        .map((value, index) => `${chartX(index)},${chartY(value)}`)
                        .join(' ');
                    return (
                        <g key={series.name}>
                            <polyline
                                points={points}
                                fill="none"
                                stroke={series.color}
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />
                            {series.values.map((value, index) => (
                                <circle
                                    key={`${series.name}-${index}`}
                                    cx={chartX(index)}
                                    cy={chartY(value)}
                                    r="2"
                                    fill="#ffffff"
                                    stroke={series.color}
                                    strokeWidth="1"
                                />
                            ))}
                        </g>
                    );
                })}

                {userActivityByDay.map((series, index) => {
                    const x = 495 + index * 88;
                    return (
                        <g key={`legend-${series.name}`}>
                            <rect x={x} y="250" width="9" height="9" rx="3" fill={series.color} />
                            <text x={x + 15} y="259" fill="#777984" fontSize="10">{series.name}</text>
                        </g>
                    );
                })}
            </svg>

        </section>
    )
}

export default Dashboard;