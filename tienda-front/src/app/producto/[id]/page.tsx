import { notFound } from "next/navigation";
import ProductDetail from "./ProductDetail";

interface ProductPageProps {
  params: { id: string };
}

async function getProduct(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos/${id}`, {
      cache: "no-store"
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
