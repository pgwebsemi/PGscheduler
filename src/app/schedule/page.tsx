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
