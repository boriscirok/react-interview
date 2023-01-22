import { createSlice } from '@reduxjs/toolkit'

export type FilterType = {
  gender: string[]
  activeGender: string
  status: string[]
  activeStatus: string
}

export const initialState = {
  status: ['All', 'Alive', 'Dead', 'Unknown'],
  activeStatus: 'All',
  gender: ['All', 'Male', 'Female', 'Unknown'],
  activeGender: 'All'
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatusActiveFilter(state, { payload }) {
      state.activeStatus = payload
    },
    changeGenderActiveFilter(state, { payload }) {
      state.activeGender = payload
    }
  }
})

export const { changeStatusActiveFilter, changeGenderActiveFilter } = filterSlice.actions

export default filterSlice.reducer
