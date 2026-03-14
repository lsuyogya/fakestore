import { customFetch } from "@/app/utils/fetchInterceptor";
import { Product } from "@/app/utils/types";
import Image from "next/image";
import Link from "next/link";
import RatingComponent from "@/app/_components/RatingComponent";
import QtyAddtoCartBtn from "./components/QtyAddtoCartBtn";

//fix vercel deploy error, fakestore rejected server side prerender request
export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>; //string cuz alpanumeric possibility
}) {
  const { id } = await params;
  const product = await customFetch<Product>(`/products/${id}`, {
    next: { revalidate: 7200, tags: [`product-${id}`] },
  });
  const categoryParam = new URLSearchParams({
    category: product.category,
  }).toString();
  return (
    <div className="grow content-center">
      <div className="max-w-3xl mx-auto my-auto flex gap-8">
        <Link href={`/products/${product.id}`} className="contents">
          <Image
            className="my-auto mx-auto object-contain max-w-[min(100%,300px)]"
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            loading="eager"
          />
        </Link>
        <div className="detail-wrapper flex flex-col gap-4 my-auto">
          <div className="flex justify-between w-full">
            <RatingComponent rating={product.rating} />
            <p>${product.price.toFixed(2)}</p>
          </div>
          <Link href={`/products/${product.id}`} className="contents">
            <h2 className="text-xl">{product.title}</h2>
          </Link>
          <Link
            href={`/products?${categoryParam}`}
            className="capitalize p-2 bg-green-200/60 rounded w-max"
          >
            {product.category}
          </Link>
          <p className="first-letter:capitalize text-grey-700">
            {product.description}
          </p>
          <QtyAddtoCartBtn product={product} />
        </div>
      </div>
    </div>
  );
}
