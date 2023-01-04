import {useShopItems} from "../hooks/useShopItems";
import * as React from "react";
import {ShopItemModel} from "../model/ShopItemModel";
import {Alert, CircularProgress, Grid} from "@mui/material";
import {ShopItem} from "./ShopItem";
import Container from "@mui/material/Container";


export function Shop() {
    const {isLoading, isError, errorMessage, shopItems, loyaltyPoints} = useShopItems();

    if (isLoading) {
        return <CircularProgress sx={{position: "fixed", top: "50%", left: "50%"}}/>
    }
    if (isError) {
        return <Alert severity="error">{errorMessage}</Alert>
    }
    return (
        <Container>
            <h1>Shop</h1>
            {/*TODO make prettier*/}
            <p>Remaining loyalty points: {loyaltyPoints}</p>
            <Grid container>
                {shopItems.map((item: ShopItemModel) => (
                    <Grid item key={item.shopItemId}>
                        <ShopItem item={item}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
