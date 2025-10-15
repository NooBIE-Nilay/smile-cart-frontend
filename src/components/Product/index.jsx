import {
  Header,
  PageNotFound,
  PageLoader,
  AddToCart,
} from "components/commons";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button, Typography } from "neetoui";
import { isNotNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import routes from "routes";

import Carousel from "./Carousel";

const Product = () => {
  const { slug } = useParams();
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const { data: product = {}, isLoading, isError } = useShowProduct(slug);
  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscount = mrp - offerPrice;
  const discountPercentage = ((totalDiscount / mrp) * 100).toFixed(1);

  const { t } = useTranslation();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) return <PageNotFound />;

  return (
    <>
      <Header title={name} />
      <div className="mt-16 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
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
          <div className="flex space-x-10">
            <AddToCart {...{ slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label={t("buyNow")}
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
