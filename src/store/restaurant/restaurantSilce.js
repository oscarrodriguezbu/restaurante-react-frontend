import { createSlice } from "@reduxjs/toolkit";

export const restaurantSilce = createSlice({
  name: "restaurant",
  initialState: {
    active: null,
    restaurants: []
  },
  reducers: {
    onActiveRestaurant: (state, { payload }) => {
      state.active = { ...payload };
      state.restaurants.push( payload );
    },
    clearRestaurantsHsitory: (state) => {
        state.active= null,
        state.restaurants= []
      },
  },
});

// Action creators are generated for each case reducer function
export const { onActiveRestaurant, clearRestaurantsHsitory } =
  restaurantSilce.actions;
