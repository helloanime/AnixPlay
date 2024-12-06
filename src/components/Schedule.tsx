import React, { useState } from 'react';
import { format } from 'date-fns';

interface ScheduleItem {
  title: string;
  episode: number;
  time: string;
  image: string;
}

interface ScheduleProps {
  scheduleData: Record<string, ScheduleItem[]>;
}

const Schedule: React.FC<ScheduleProps> = ({ scheduleData }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [selectedDay, setSelectedDay] = useState(format(new Date(), 'EEEE'));

  return (
    <div className="bg-card rounded-xl p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Weekly Schedule</h2>
      
      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors
              ${day === selectedDay 
                ? 'bg-primary text-white' 
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'}`}
          >
            {day}
          </button>
        ))}
      </div>
      
      {/* Schedule list */}
      <div className="space-y-4">
        {scheduleData[selectedDay]?.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No anime scheduled for {selectedDay}</p>
        ) : (
          scheduleData[selectedDay]?.map((item, index) => (
            <div key={index} className="flex gap-3 group cursor-pointer">
              <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.jpg';
                  }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400">
                  Episode {item.episode} • {item.time}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Schedule;
