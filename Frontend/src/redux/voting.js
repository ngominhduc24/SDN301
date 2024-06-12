import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  votingModal: false,
}

export const votingSlice = createSlice({
  name: "voting",
  initialState,
  reducers: {
    setVotingModal: (state, action) => {
      state.votingModal = action.payload
    },
  },
})

export const { setVotingModal } = votingSlice.actions

export default votingSlice.reducer
