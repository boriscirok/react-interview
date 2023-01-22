import { configureStore } from '@reduxjs/toolkit'
import themeSlice, { Theme } from 'store/reducers/theme'
import filterSlice, { FilterType } from 'store/reducers/filter'

const store = configureStore({
  reducer: {
    filter: filterSlice,
    theme: themeSlice
  }
})

export type AppStore = {
  filter: FilterType
  theme: Theme
}

export default store
