import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/utils/types";
import RatingComponent from "@/app/_components/RatingComponent";
import AddtoCart from "@/app/_components/AddtoCart";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="card product-card">
      <Link href={`/products/${product.id}`} className="contents">
        <Image
          className="my-auto mx-auto object-contain max-w-[min(100%,200px)]"
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          loading="lazy"
        />
      </Link>
      <div className="flex justify-between w-full">
        <RatingComponent rating={product.rating} />
        <p>${product.price.toFixed(2)}</p>
      </div>
      <Link href={`/products/${product.id}`} className="contents">
        <h2 className="text-xl h-lh line-clamp-1">{product.title}</h2>
      </Link>
      <p className="line-clamp-3 h-[3lh] first-letter:capitalize text-grey-700">
        {product.description}
      </p>
      <div className="flex justify-between w-full">
        <Link href={`/products/${product.id}`} className="btn-grey">
          View Details
        </Link>
        <AddtoCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
