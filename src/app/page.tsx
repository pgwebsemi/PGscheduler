'use client';

import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";

type DateKey = '8/15' | '8/16' | '8/17' | '8/18' | '8/19' | '8/20' | '8/21' | '8/22' | '8/23' | '8/24' | '8/25' | '8/26' | '8/27' | '8/28' | '8/29' | '8/30' | '8/31';

type Schedule = {
  [key in DateKey]?: number[] | boolean[];
};

type Member = {
  name: string;
  schedule: Schedule;
};

const allDates: DateKey[] = ['8/15', '8/16', '8/17', '8/18', '8/19', '8/20' , '8/21', '8/22', '8/23', '8/24', '8/25', '8/26', '8/27', '8/28', '8/29', '8/30', '8/31'];

const members: Member[] = [
  {
    name: 'AAA',
    schedule: {
      '8/15': [1,2,3,5,8,9],
      '8/16': [1,4,5,6,7,12,22],
      '8/17': [1,12,13,14,15],
      '8/18': [13],
      '8/19': [10,11,12,13],
      '8/20': [10,11,12,13],
      '8/29': [10,11,12,13,14,15,16,17]
    }
  },
  {
    name: 'BBB',
    schedule: {
      '8/15': [4,5,6,7,8,9,10,11,12,13,14,15],
      '8/16': [8,9,10,11,12,13],
      '8/17': [10,11,12,13,14,15],
      '8/18': [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      '8/19': [10,11,12,13,14,15,16,17,18,19,20,21,22],
      '8/20': [10,11,12,13],
      '8/24': [10,11,12,13],
      '8/25': [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      '8/26': [10,11,12,13],
      '8/29': [10,11,12,13,14,15,16,17],//何時から何時にしたい
    }
  },
  {
    name: 'CCC',
    schedule: {
      '8/15': [],
      '8/16': [],
      '8/17': [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      '8/18': [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      '8/19': [10,11,12,13,14,15,16,17,18,19,20,21,22],
      '8/20': [10,11,12,13],
      '8/29': [10,11,12,13,14,15,16,17]
    }
  },
  {
    name: 'DDD',
    schedule: {
      '8/15': [17,18,19,20,21,22],
      '8/16': [],
      '8/17': [10,11,12,13,14,15],
      '8/18': [10,11,12,13,14,15,16,17,18,19,20,21,22],
      '8/19': [10,11,12,13,14,15,16,17,18,19,20,21,22],
      '8/20': [10,11,12,13],
      '8/29': [9,10,11,12,13,14,15,16,17]
    }
  }
]

export default function Home() {
  const { user, logout } = useAuth();
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const daysToShow = 5;

  const maxIndex = Math.max(0, allDates.length - daysToShow);
  const safeIndex = Math.min(currentDateIndex, maxIndex);

  const displayDates = allDates.slice(safeIndex, safeIndex + daysToShow);

  const isAllMembersScheduled = (date: DateKey, hour: number): boolean => {
    return members.every(member => {
      const schedule = member.schedule[date];
      return Array.isArray(schedule) && 
             ((typeof schedule[0] === 'number' && (schedule as number[]).includes(hour)) ||
              (typeof schedule[0] === 'boolean' && (schedule as boolean[])[hour]));
    });
  };

  const handlePrevDates = () => {
    if (currentDateIndex > 0) {
      setCurrentDateIndex(prev => prev - 1);
    }
  };

  const handleNextDates = () => {
    if (currentDateIndex < maxIndex) {
      setCurrentDateIndex(prev => prev + 1);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full flex justify-end items-center row-start-1">
        {user && (
          <div className="flex items-center gap-2">
            <span className="text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              ログアウト
            </button>
          </div>
        )}
      </header>

      <div className="font-sans p-4">
        <div className="flex justify-between mb-4">
          <button
            onClick={handlePrevDates}
            disabled={currentDateIndex === 0}
            className={`px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600'`}
          >
            ◀ 前の日付
          </button>

          <button
            onClick={handleNextDates}
            disabled={currentDateIndex + daysToShow >= allDates.length}
            className={`px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600`}
          >
            次の日付 ▶
          </button>
        </div>

        <div className="flex">
          <div className="w-20 border border-gray-300"></div>
          {displayDates.map((date) => (
            <div key={date} className="flex-1 border border-gray-300 text-center py-2">
              {date}
            </div>
          ))}
        </div>

        {members.map((member) => (
          <div key={member.name} className="flex">
            <div className="w-20 border border-gray-300 p-2">{member.name}</div>

            {displayDates.map((date) => (
              <div key={date} className="relative flex-1 border border-gray-300 h-12 flex">
                {member.schedule[date] ? (
                  Array(24).fill(0).map((_, hour) => {
                    //---
                    const allScheduled = isAllMembersScheduled(date, hour);
                    const hasSchedule = (member.schedule[date] as number[]).includes(hour);
                    //---
                    return (
                      <div
                        key={hour}
                        className={`flex-1 min-w-[8px] h-full ${
                          allScheduled ? 'bg-blue-400' : 
                          hasSchedule ? 'bg-green-400' : ''
                        } border-r border-gray-200 last:border-0`}
                      />
                    );
                  })
                ) : (
                  Array(24).fill(0).map((_, hour) => (
                    <div
                      key={hour}
                      className={`flex-1 min-w-[8px] h-full ${
                        isAllMembersScheduled(date, hour) ? 'bg-red-500' : ''
                      } border-r border-gray-200 last:border-0`}
                    />
                  ))
                )}
              </div>
            ))}
          </div>
        ))}
        

      </div>
    </div>
  );
}