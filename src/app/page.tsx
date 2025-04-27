'use client';
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";

type DateKey = '8/15' | '8/16' | '8/17' | '8/18' | '8/19';

type Schedule = {
  [key in DateKey]: boolean[];
};

type Member = {
  name: string;
  schedule: Schedule;
};

const dates: DateKey[] = ['8/15', '8/16', '8/17', '8/18', '8/19']

const members: Member[] = [
  {
    name: 'AAA',
    schedule: {
      '8/15': Array(24).fill(false),
      '8/16': Array(24).fill(false).map((_, i) => i >= 6 && i < 14), // 6〜13時だけtrue
      '8/17': Array(24).fill(false),
      '8/18': Array(24).fill(false),
      '8/19': Array(24).fill(false).map((_, i) => i >= 10 && i < 14),
    }
  },
  {
    name: 'BBB',
    schedule: {
      '8/15': Array(24).fill(false).map((_, i) => i >= 4 && i < 16),
      '8/16': Array(24).fill(false).map((_, i) => i >= 8 && i < 14),
      '8/17': Array(24).fill(false).map((_, i) => i >= 10 && i < 16),
      '8/18': Array(24).fill(false).map((_, i) => i >= 1 && i < 16),
      '8/19': Array(24).fill(false).map((_, i) => i >= 10 && i < 10),
    }
  },
  {
    name: 'CCC',
    schedule: {
      '8/15': Array(24).fill(false),
      '8/16': Array(24).fill(false),
      '8/17': Array(24).fill(false).map((_, i) => i >= 0 && i < 24),
      '8/18': Array(24).fill(false).map((_, i) => i >= 0 && i < 24),
      '8/19': Array(24).fill(false).map((_, i) => i >= 10 && i < 23),
    }
  },
  {
    name: 'DDD',
    schedule: {
      '8/15': Array(24).fill(false),
      '8/16': Array(24).fill(false),
      '8/17': Array(24).fill(false).map((_, i) => i >= 10 && i < 16),
      '8/18': Array(24).fill(false).map((_, i) => i >= 10 && i < 23),
      '8/19': Array(24).fill(false),
    }
  }
]



export default function Home() {
  const { user, logout } = useAuth();

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

      <div className="flex">
        <div className="w-20 border border-gray-300"></div>
        {dates.map((date) => (
          <div key={date} className="flex-1 border border-gray-300 text-center py-2">
            {date}
          </div>
        ))}
      </div>


      {members.map((member) => (
        <div key={member.name} className="flex">
          <div className="w-20 border border-gray-300 p-2">{member.name}</div>

          {dates.map((date) => (
            <div key={date} className="relative flex-1 border border-gray-300 h-12 flex">
              {(member.schedule[date]).map((isFree, hour) => (
                <div
                  key={hour}
                  className={`flex-1 min-w-[8px] h-full ${isFree ? 'bg-green-400' : ''} border-r border-gray-200 last:border-0`}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>


      

    </div>
  );
}
