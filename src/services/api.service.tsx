import { getToken } from "@/utilits";
import { get } from "http";

export async function handleSingleproducts(id: string) {
    try {
        const response = await fetch(`${process.env.NEXT_BASE_URL}/api/v1/products/${id}`, {
            next: { revalidate: 60 } 
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching single product:", error);
        return null; 
    }
}
// شيلنا الـ id من الأقواس
export async function handleAllProducts() {
    try {
        const response = await fetch(`${process.env.NEXT_BASE_URL}/api/v1/products`, {
            next: { revalidate: 60 } 
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching all products:", error);
        return null; 
    }
}

export async function handleAllBrands() {
    try {
        const response = await fetch(`${process.env.NEXT_BASE_URL}/api/v1/brands`, {
            next: { revalidate: 60 } 
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch brands');
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching all brands:", error);
        return null; 
    }
}

export async function getBrandDetails(id: string) {
    try {

        const response = await fetch(`${process.env.NEXT_BASE_URL}/api/v1/brands/${id}`);
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching brand details:", error);
        return null;
    }
}

export async function getProductsByBrand(brandId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_BASE_URL}/api/v1/products?brand=${brandId}`);
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error("Error fetching products by brand:", error);
        return [];
    }
}

export async function getTheCart() {
    const token = await getToken();
    try {
        const response = await fetch(`${process.env.NEXT_BASE_URL}/api/v1/cart`, {
            headers:{
                token: token as string,
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch cart');
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching cart:", error);
        return null; 
    }
}