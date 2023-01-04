import {Card, CardContent, Typography} from "@mui/material";
import React from "react";
import {ShopItemModel} from "../model/ShopItemModel";
import useBuyShopItem from "../hooks/useBuyShopItem";
import Button from "@mui/material/Button";

interface ShopItemProps {
    item: ShopItemModel,
}

export function ShopItem({item}: ShopItemProps) {
    const {buyShopItemMutation} = useBuyShopItem();
    function buyShopItem(itemId: number) {
       buyShopItemMutation(itemId);
    }
    //todo: add a profile picture
    return (
        <Card sx={{width: 340, margin: 1}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {item.itemCategory.replace('_', ' ').toLowerCase()}
                </Typography>
                <Typography variant="h5" component="div">
                    {item.name}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">$
                    {item.price}
                </Typography>
               <Button onClick={()=>buyShopItem(item.shopItemId)}>Buy item</Button>
            </CardContent>
        </Card>
    )
}
