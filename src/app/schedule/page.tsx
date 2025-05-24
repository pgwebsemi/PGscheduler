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
