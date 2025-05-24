"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mockGroups } from "../mock/group";
import {
  PlusIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  PencilIcon,
} from "lucide-react";

export default function GroupManagementPage() {
  const [groups, setGroups] = useState(mockGroups);
  const [selectedGroupId, setSelectedGroupId] = useState("groupA");
  const selectedGroup = groups.find((group) => group.id === selectedGroupId);

  const handleAddGroup = () => {
    const newGroupId = `group${groups.length + 1}`;
    const newGroup = {
      id: newGroupId,
      name: "New Group",
      members: [],
    };
    setGroups([...groups, newGroup]);
    setSelectedGroupId(newGroupId);
  };

  const handleDeleteGroup = () => {
    if (!selectedGroup) return;
    const newGroups = groups.filter((group) => group.id !== selectedGroup.id);
    setGroups(newGroups);
    if (newGroups.length > 0) {
      setSelectedGroupId(newGroups[0].id);
    } else {
      setSelectedGroupId("");
    }
  };

  const handleMoveUpGroup = () => {
    const currentIndex = groups.findIndex(
      (group) => group.id === selectedGroupId,
    );
    if (currentIndex > 0) {
      const newSelectedGroupId = groups[currentIndex - 1].id;
      setSelectedGroupId(newSelectedGroupId);
    }
  };

  const handleMoveDownGroup = () => {
    const currentIndex = groups.findIndex(
      (group) => group.id === selectedGroupId,
    );
    if (currentIndex < groups.length - 1) {
      const newSelectedGroupId = groups[currentIndex + 1].id;
      setSelectedGroupId(newSelectedGroupId);
    }
  };

  const handleAddMember = () => {
    if (!selectedGroup) return;
    const newMember = {
      id: `member${selectedGroup.members.length + 1}`,
      name: "New Member",
    };
    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id
        ? { ...group, members: [...group.members, newMember] }
        : group,
    );
    setGroups(updatedGroups);
  };

  const handleDeleteMember = (memberId: string) => {
    if (!selectedGroup) return;
    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id
        ? {
            ...group,
            members: group.members.filter((member) => member.id !== memberId),
          }
        : group,
    );
    setGroups(updatedGroups);
  };

  const handleEditMember = (memberId: string) => {
    const newName = prompt("新しい名前を入力してください");
    if (!newName) return;

    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup?.id
        ? {
            ...group,
            members: group.members.map((member) =>
              member.id === memberId ? { ...member, name: newName } : member,
            ),
          }
        : group,
    );
    setGroups(updatedGroups);
  };

  return (
    <div className="flex min-h-screen items-center justify-center gap-8 p-8">
      {/* 左側 グループ操作 */}
      <div className="flex flex-col items-center gap-4">
        <Button size="icon" variant="outline" onClick={handleDeleteGroup}>
          <TrashIcon className="h-5 w-5" />
        </Button>

        <Button size="icon" variant="outline" onClick={handleAddGroup}>
          <PlusIcon className="h-5 w-5" />
        </Button>

        <input
          type="text"
          value={selectedGroup?.name || ""}
          onChange={(e) => {
            const updatedGroups = groups.map((group) =>
              group.id === selectedGroup?.id
                ? { ...group, name: e.target.value }
                : group,
            );
            setGroups(updatedGroups);
          }}
          className="font-bold text-lg bg-gray-100 p-2 rounded shadow min-w-[120px] text-center"
        />

        <Button size="icon" variant="outline" onClick={handleMoveUpGroup}>
          <ChevronUpIcon className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="outline" onClick={handleMoveDownGroup}>
          <ChevronDownIcon className="h-5 w-5" />
        </Button>
      </div>

      {/* 右側 メンバーリスト */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-4">
          Members
          <Button size="icon" variant="outline" onClick={handleAddMember}>
            <PlusIcon className="h-5 w-5" />
          </Button>
        </h2>

        <ul className="space-y-4">
          {selectedGroup?.members.map((member) => (
            <li key={member.id} className="flex items-center gap-4">
              <span className="w-20">{member.name}</span>

              <Button
                size="icon"
                variant="outline"
                onClick={() => handleEditMember(member.id)}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="outline"
                onClick={() => handleDeleteMember(member.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
