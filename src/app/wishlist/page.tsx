import React from 'react';
import WishlistDesign from '../_components/WishlistDesign/WishlistDesign';
import { getWishlist } from './WishList.action';

export default async function WishlistPage() {
    // جلب الداتا من الباك إند
    const wishlistResponse = await getWishlist();
    const wishlistItems = wishlistResponse.data || [];

    return (
        <WishlistDesign initialItems={wishlistItems} />
    );
}