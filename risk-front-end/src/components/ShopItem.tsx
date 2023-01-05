import {Card, CardContent, Typography, CardMedia} from "@mui/material";
import React from "react";
import {ShopItemModel} from "../model/ShopItemModel";
import Button from "@mui/material/Button";

interface ShopItemProps {
    item: ShopItemModel;
    buyItem: (id: number) => void
}

export function ShopItem({item, buyItem}: ShopItemProps) {

    function itemNameToImage(name: string) {
        name = name.replace(' ', '')
        const caplessName = name.slice(0, 1).toLowerCase() + name.slice(1)
        return `avatar/${caplessName}.png`
    }

    function capitalizeItemCategory(str: string) {
        str = str.toLowerCase();
        str = str.split('_').map((word: string) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");
        return str;
    }


    //todo: add a profile picture
    return (
        <Card sx={{width: 340, margin: 1, display: "flex", justifyContent: "space-between"}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {capitalizeItemCategory(item.itemCategory)}
                </Typography>
                <Typography variant="h5" component="div">
                    {item.name}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">$
                    {item.price}
                </Typography>
                <Button onClick={() => buyItem(item.shopItemId)}>Buy item</Button>
            </CardContent>
            {item.itemCategory === 'PROFILE_PICTURE' ?
                <CardMedia
                    component="img"
                    sx={{width: 151}}
                    image={itemNameToImage(item.name)}
                    alt={item.name}
                />
                :
                ""
            }

        </Card>
    )
}
