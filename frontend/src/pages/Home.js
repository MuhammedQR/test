import React from "react";
import CategoryList from "../component/CategoryList";
import BannerProduct from "../component/BannerProduct";
import HorizontalCardProduct from "../component/HorizontalCardProduct";
import VerticalCardProduct from "../component/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct
        category={"watches"}
        heading={"Popular's Watches"}
      />
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"mouse"} heading={"Mouses"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"} />
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
      <VerticalCardProduct category={"printers"} heading={"Printers"} />
      <VerticalCardProduct category={"processor"} heading={"Processor"} />
    </div>
  );
};

export default Home;
