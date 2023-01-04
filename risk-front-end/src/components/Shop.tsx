import {useShopItems} from "../hooks/useShopItems";
import * as React from "react";
import {ShopItem} from "../model/ShopItem";
import {Alert, CircularProgress, Grid} from "@mui/material";
import {ShopItemComponent} from "./ShopItemComponent";
import Container from "@mui/material/Container";


export function Shop() {
    const {isLoading, isError, shopItems} = useShopItems();

    if (isLoading) {
        return <CircularProgress sx={{position: "fixed", top: "50%", left: "50%"}}/>
    }
    if (isError) {
        return <Alert severity="error">Error loading the shop items</Alert>
    }
    return (
        <Container>
            <h1>Shop</h1>
            <p>Remaining loyalty points: </p>
            {/*TODO make call to set points here*/}
            <Grid container>
                {shopItems.map((item: ShopItem) => (
                    <Grid item>
                        <ShopItemComponent key={item.shopItemId} item={item}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
