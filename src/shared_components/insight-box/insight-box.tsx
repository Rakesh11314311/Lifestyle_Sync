// import React from "react";

// type InsightBoxProps = {
//     title?: string;
//     children: React.ReactNode;
// };

// const InsightBox = ({ title, children }: InsightBoxProps) => {
//     return (
//         <div className="bg-white/90 rounded-2xl shadow-md p-6 text-gray-700 w-full">
//             {title && <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>}
//             <div className="space-y-2 text-sm leading-relaxed">
//                 {children}
//             </div>
//         </div>
//     );
// };

// export default InsightBox;

const InsightBox = ({ insights }: { insights: string[] }) => {
    return (
        <div className="bg-white/90 rounded-2xl shadow-md p-6 text-gray-700 w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Insights</h2>
            <div className="space-y-2 text-sm leading-relaxed">
                {insights.map((insight, index) => (
                    <p key={index}>{insight}</p>
                ))}
            </div>
        </div>
    );
};

export default InsightBox;
