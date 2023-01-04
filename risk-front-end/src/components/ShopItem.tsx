import {Card, CardContent, Typography} from "@mui/material";
import React from "react";
import {ShopItemModel} from "../model/ShopItemModel";
import Button from "@mui/material/Button";

interface ShopItemProps {
    item: ShopItemModel;
    buyItem: (id: number) => void
}

export function ShopItem({item, buyItem}: ShopItemProps) {

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
               <Button onClick={() => buyItem(item.shopItemId)}>Buy item</Button>
            </CardContent>
        </Card>
    )
}
