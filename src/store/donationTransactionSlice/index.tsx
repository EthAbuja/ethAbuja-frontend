import { ChainId } from "@/constants/config/chainId";
import { getDonationTokenAddress } from "@/constants/contract-address";
import { DonationToken } from "@/constants/contract-address/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { setDonationToken } from "../donationTokenSlice";
import { trxType } from "@/app/(main)/donation/donationUI/components/utils";

interface DonationTransactionState {
  DonationTokenBalance: number;
  DonationAmount: number;
  userCanDonate: boolean;
  OngoingTransactionType: trxType;
}
const initialState: DonationTransactionState = {
  DonationTokenBalance: 0,
  DonationAmount: 0,
  userCanDonate: false,
  OngoingTransactionType: trxType.UNKNOWN,
};

export const DonationTransactionSlice = createSlice({
  name: "donationTransaction",
  initialState,
  reducers: {
    computeDonationTokenBalance: (state, action: PayloadAction<number>) => {
      state.DonationTokenBalance = state.DonationTokenBalance;
      //   const newDonationTokenAddress = getDonationTokenAddress({
      //     chainId: action.payload.chainId,
      //     donationTokenTicker: action.payload.tokenTicker,
      //   });
    },
    setDonationAmount: (state, action: PayloadAction<number>) => {
      state.DonationAmount = action.payload;
    },
    setDonationBalance: (state, action: PayloadAction<number>) => {
      state.DonationTokenBalance = action.payload;
    },
    setOngoingTrxType: (state, action: PayloadAction<trxType>) => {
      state.OngoingTransactionType = action.payload;
    },
  },
});

export const {
  setDonationBalance,
  setDonationAmount,
  computeDonationTokenBalance,
  setOngoingTrxType,
} = DonationTransactionSlice.actions;
export default DonationTransactionSlice.reducer;