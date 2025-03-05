// selectors.ts
import { createSelector } from "@reduxjs/toolkit";
import { orderBy } from "lodash";
import type { RootState } from "@/store/store";

export const getChatsForProspect = createSelector(
  [
    (state: RootState) => state.Prospect.selectedProspect,
    (state: RootState) => state.chat.chats,
  ],
  (selectedProspect, chats) => {
    if (!selectedProspect) return [];
    const chatGroup = chats.find(
      (group) => group.prospectId === selectedProspect.id
    );
    console.log(chatGroup);
    return orderBy(chatGroup?.chats || [], ["createdAt"]);
  }
);
