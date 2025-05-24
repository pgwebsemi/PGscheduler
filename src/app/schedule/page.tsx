"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { mockschedule as initialMember } from "../mock/schedule";

const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
// 曜日の関数
function getWeekDates(startDate: Date): string[] {
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    dates.push(`${d.getMonth() + 1}/${d.getDate()}`);
  }
  return dates;
}

export default function ScheduleManagementPage() {
  const [member, setMember] = useState(initialMember);
  const [startDate, setStartDate] = useState(() => new Date("2024-08-17"));
  const weekDates = getWeekDates(startDate);
  // on offを切り替える関数
  const toggleHour = (day: string, hour: number) => {
    const hours = member.schedule?.[day] || [];
    const newHours = hours.includes(hour)
      ? hours.filter((h) => h !== hour)
      : [...hours, hour];

    setMember({
      ...member,
      schedule: {
        ...member.schedule,
        [day]: newHours,
      },
    });
  };

  const handleSave = () => {
    console.log("保存するスケジュール:", member);
  };
  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">
        {member.name} のスケジュール管理
      </h1>

      {/* 週切替 */}
      <div className="flex items-center gap-4 mb-4">
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            const newDate = new Date(startDate);
            newDate.setDate(newDate.getDate() - 7);
            setStartDate(newDate);
          }}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <div className="text-lg font-semibold">
          {weekDates[0]} 〜 {weekDates[6]}
        </div>

        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            const newDate = new Date(startDate);
            newDate.setDate(newDate.getDate() + 7);
            setStartDate(newDate);
          }}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
