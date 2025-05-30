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

type Group = {
  name: string;
  members: Member[];
};

const allDates: DateKey[] = ['8/15', '8/16', '8/17', '8/18', '8/19', '8/20' , '8/21', '8/22', '8/23', '8/24', '8/25', '8/26', '8/27', '8/28', '8/29', '8/30', '8/31'];

const groups: Group[] = [
  {
    name: 'Group A',
    members: [
      {
        name: '中澤',
        schedule: {
          '8/15': [1,2,3,5,8,9],
          '8/16': [1,4,5,6,7,12,22],
          '8/17': [1,12,13,14,15],
          '8/18': [13],
          '8/19': [10,11,12,13],
        }
      },
      {
        name: '田中',
        schedule: {
          '8/15': [4,5,6,7,8,9,10,11,12,13,14,15],
          '8/16': [8,9,10,11,12,13],
          '8/17': [10,11,12,13,14,15],
          '8/18': [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
          '8/19': [10,11,12,13,14,15,16,17,18,19,20,21,22],
        }
      },
    ]
  },
  {
    name: 'Group B',
    members: [
      {
        name: '安室',
        schedule: {
          '8/15': [],
          '8/16': [],
          '8/17': [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
          '8/18': [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
          '8/19': [10,11,12,13,14,15,16,17,18,19,20,21,22],
        }
      },
      {
        name: '竹本',
        schedule: {
          '8/15': [17,18,19,20,21,22],
          '8/16': [],
          '8/17': [10,11,12,13,14,15],
          '8/18': [10,11,12,13,14,15,16,17,18,19,20,21,22],
          '8/19': [10,11,12,13,14,15,16,17,18,19,20,21,22],
        }
      },
      {
        name: '工藤',
        schedule: {
          '8/15': [17,18,19,20,21,22],
          '8/16': [],
          '8/17': [10,11,12,13,14,15],
          '8/18': [10,11,12,13,14,15,16,17,18,19,20,21,22],
          '8/19': [10,11,12,13,14,16],
        }
      },
    ]
  },
  {
    name: 'Group C',
    members: [
      {
        name: '濃茶',
        schedule: {
          '8/15': [1,2,3,5,8,9],
          '8/16': [1,4,5,6,7,12,22],
          '8/17': [1,12,13,14,15],
          '8/18': [13],
          '8/19': [10,11,12,13],
        }
      }
    ]
  }
];

export default function Home() {
  const { user, logout } = useAuth();
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const daysToShow = 5;
  const [selectedGroupIdx, setSelectedGroupIdx] = useState(0);
  const selectedGroup = groups[selectedGroupIdx];

  const maxIndex = Math.max(0, allDates.length - daysToShow);
  const safeIndex = Math.min(currentDateIndex, maxIndex);

  const displayDates = allDates.slice(safeIndex, safeIndex + daysToShow);

  const isAllMembersScheduled = (date: DateKey, hour: number): boolean => {
    return selectedGroup.members.every(member => {
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

      <div className="flex">
        <div className="mr-8 min-w-[120px]">
          <div className="mb-2 font-bold">グループ</div>
          {groups.map((group, idx) => (
            <button
              key={group.name}
              onClick={() => setSelectedGroupIdx(idx)}
              className={`block w-full text-left px-3 py-2 mb-1 rounded border ${selectedGroupIdx === idx ? 'bg-blue-100 border-blue-500 font-bold' : 'bg-white border-gray-300'}`}
            >
              {group.name}
            </button>
          ))}
        </div>
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

          {selectedGroup.members.map((member) => (
            <div key={member.name} className="flex">
              <div className="w-20 border border-gray-300 p-2">{member.name}</div>

              {displayDates.map((date) => (
                <div key={date} className="relative flex-1 border border-gray-300 h-12 flex">
                  {member.schedule[date] ? (
                    Array(24).fill(0).map((_, hour) => {
                      //---
                      const allScheduled = selectedGroup.members.every(m => {
                        const s = m.schedule[date];
                        return Array.isArray(s) && (s as number[]).includes(hour);
                      });
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
                        className={`flex-1 min-w-[8px] h-full border-r border-gray-200 last:border-0`}
                      />
                    ))
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}