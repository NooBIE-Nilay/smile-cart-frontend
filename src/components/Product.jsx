import { useEffect, useState } from "react";

import axios from "axios";
import { Spinner, Typography } from "neetoui";
import { append, isNotNil } from "ramda";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        "https://smile-cart-backend-staging.neetodeployapp.com/products/infinix-inbook-2"
      );
      setProduct(response.data);
    } catch (error) {
      console.log("An Error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    name,
    description,
    mrp,
    offer_price: offerPrice,
    image_urls: imageUrls,
    image_url: imageUrl,
  } = product;
  const totalDiscount = mrp - offerPrice;
  const discountPercentage = ((totalDiscount / mrp) * 100).toFixed(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      <div>
        <Typography className="py-2 text-4xl font-semibold" style="h1">
          {name}
        </Typography>
        <hr className="border-2 border-black " />
      </div>
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          {isNotNil(imageUrls) ? (
            <Carousel
              imageUrls={append(imageUrl, imageUrls)}
              title={product.name}
            />
          ) : (
            <img alt={name} className="w-48" src={imageUrl} />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: ${mrp / 100}</Typography>
          <Typography className="font-semibold">
            Offer price: ${offerPrice / 100}
          </Typography>
          <Typography className=" font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Product;
