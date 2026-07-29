import { create } from 'zustand';

import {
  AVALON_DEFAULT_SELECTED_ROLE_IDS,
  AVALON_SELECTABLE_ROLE_IDS,
} from '@/constants/avalonRoles';
import {
  normalizeAvalonRoleSelection,
  validateAvalonRoleSelection,
} from '@/lib/avalon-roles/avalonRoles';
import type {
  AvalonPlayer,
  AvalonPlayerCount,
  AvalonRoleId,
  AvalonRolesStore,
} from '@/types/avalonRoles';

function createInitialSelectedRoleIds(): AvalonRoleId[] {
  return [...AVALON_DEFAULT_SELECTED_ROLE_IDS];
}

export const useAvalonRolesStore = create<AvalonRolesStore>()((set, get) => ({
  playerCount: 5,
  selectedRoleIds: createInitialSelectedRoleIds(),
  currentRoomId: null,
  currentPlayerId: null,
  hostId: null,
  room: null,
  players: [],

  setPlayerCount: (playerCount: AvalonPlayerCount) => set({ playerCount }),

  setSelectedRoleIds: (roleIds: AvalonRoleId[]) =>
    set({ selectedRoleIds: normalizeAvalonRoleSelection(roleIds) }),

  toggleRole: (roleId: AvalonRoleId) =>
    set((state) => {
      if (
        !(AVALON_SELECTABLE_ROLE_IDS as readonly AvalonRoleId[]).includes(
          roleId,
        )
      ) {
        return state;
      }

      const isSelected = state.selectedRoleIds.includes(roleId);
      const selectedRoleIds = isSelected
        ? state.selectedRoleIds.filter(
            (selectedRoleId) => selectedRoleId !== roleId,
          )
        : [...state.selectedRoleIds, roleId];

      return {
        selectedRoleIds: normalizeAvalonRoleSelection(selectedRoleIds),
      };
    }),

  resetDraft: () =>
    set({
      playerCount: 5,
      selectedRoleIds: createInitialSelectedRoleIds(),
    }),

  getValidation: () =>
    validateAvalonRoleSelection(get().playerCount, get().selectedRoleIds),

  setSession: ({ roomId, playerId, hostId }) =>
    set({
      currentRoomId: roomId,
      currentPlayerId: playerId,
      hostId: hostId ?? get().hostId,
    }),

  clearSession: () =>
    set({
      currentRoomId: null,
      currentPlayerId: null,
      hostId: null,
      room: null,
      players: [],
    }),

  setRoom: (room) =>
    set({
      room,
      currentRoomId: room?.id ?? get().currentRoomId,
      hostId: room?.hostId ?? get().hostId,
    }),

  setPlayers: (players: AvalonPlayer[]) => set({ players }),

  upsertPlayer: (player: AvalonPlayer) =>
    set((state) => {
      const playerIndex = state.players.findIndex(
        (currentPlayer) => currentPlayer.id === player.id,
      );

      if (playerIndex === -1) {
        return { players: [...state.players, player] };
      }

      return {
        players: state.players.map((currentPlayer, index) =>
          index === playerIndex ? player : currentPlayer,
        ),
      };
    }),

  removePlayer: (playerId: string) =>
    set((state) => ({
      players: state.players.filter((player) => player.id !== playerId),
    })),

  resetRemoteState: () =>
    set({
      room: null,
      players: [],
    }),
}));
