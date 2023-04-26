import {createSlice} from "@reduxjs/toolkit";

let increse;
export const productSlice = createSlice({
    name: "product",
    initialState: {value : {items: []}},
    reducers: {
        getAllProducts: (state, action) => {
            state.value = action.payload
        },
        updateIsLiked:  (state, action) => {
            const idx = state.value.items.findIndex(el => el.id === action.payload)
            state.value.items[idx].isLiked = !state.value.items[idx].isLiked
        },
        updateInShop : (state,action) => {
            const idx = state.value.items.findIndex(el => el.id === action.payload)
            state.value.items[idx].inShop = true
            state.value.items[idx].product_qty = state.value.items[idx].product_qty + 1
        },
        updateQtyPlus : (state, action) => {
            const idx = state.value.items.findIndex(el => el.id === action.payload)
            state.value.items[idx].product_qty = state.value.items[idx].product_qty + 1
        },
        deleteFromShop: (state,action) => {
            const idx = state.value.items.findIndex(el => el.id === action.payload)
            state.value.items[idx].inShop = false
            state.value.items[idx].product_qty = 0

        },
        decreaseProductQty: (state,action) => {
            const idx = state.value.items.findIndex(el => el.id === action.payload)
            state.value.items[idx].product_qty = state.value.items[idx].product_qty === 1 ? 1 : state.value.items[idx].product_qty - 1
        },
        updateItemNumber: (state, action) => {
            const idx = state.value.items.findIndex(el => el.id === action.payload)
            state.value.items[idx].inShop = true
            state.value.items[idx].product_qty = state.value.items[idx].product_qty + action.payload[1]
        }

    }
})

export const {getAllProducts, updateIsLiked,updateInShop,updateQtyPlus, deleteFromShop,decreaseProductQty,updateItemNumber} = productSlice.actions

export default productSlice.reducer;