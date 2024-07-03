import { defineStore } from 'pinia'
export const usePersonStore = defineStore ('person', {
    state: () => ({
        persons: [],
    })
})
