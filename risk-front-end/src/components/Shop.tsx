import {useShopItems} from "../hooks/useShopItems";
import * as React from "react";
import {ShopItem} from "../model/ShopItem";
import {Alert, CircularProgress, Grid} from "@mui/material";
import {ShopItemComponent} from "./ShopItemComponent";


export function Shop() {
    const {isLoading, isError, shopItems} = useShopItems();

    if (isLoading) {
        return <CircularProgress sx={{position: "fixed", top: "50%", left: "50%"}}/>
    }
    if (isError) {
        return <Alert severity="error">Error loading the shop items</Alert>
    }
    return (
        <div>
            <h1>Shop</h1>
            <Grid container
                  direction="row"
                  alignItems="center"
                  wrap="wrap"
                  rowSpacing={2}
                  columnSpacing={2}
                  spacing={1}
                  marginLeft={3}>
                {shopItems.map((item: ShopItem) => (
                    <ShopItemComponent key={item.shopItemId} item={item}></ShopItemComponent>
                ))}
            </Grid>

        </div>
    )
}
