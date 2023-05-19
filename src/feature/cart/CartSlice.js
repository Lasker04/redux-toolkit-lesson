import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

// 買い物かごの初期化
const initialState = {
    cartItems: cartItems,
    amount: 4,
    total: 0
}

const cartSlice = createSlice({
    name: "cart", // useSelecterと一致する
    initialState,
    reducers: {
        clearCart: (state) => {
            return  { cartItems: [], amount: 0, total: 0 }
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
        },
        increase: (state, action) => {
            console.log("call")
            const cartItem = state.cartItems.find((item) => item.id === action.payload)
            cartItem.amount = cartItem.amount + 1
        },
        decrease: (state, action) => {
            console.log("call")
            const cartItem = state.cartItems.find((item) => item.id === action.payload)
            cartItem.amount = cartItem.amount - 1
        },
        calculateTotals: (state) => {
            let amount = 0
            let total = 0
            state.cartItems.forEach((item) => {
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount
            state.total = total
        }
    }
})

export const {clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions
export default cartSlice.reducer