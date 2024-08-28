import CategoryList from "@/components/CategoryList";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProducList";
import Sliders from "@/components/Sliders";
import GlobalApi from "@/utils/GlobalApi";
import Image from "next/image";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();
  return (
    <main className="p-10">
      <div className="px-10">
        {/* sliders */}
        <Sliders sliderList={sliderList}/>
        <CategoryList categoryList={categoryList}/>
        <ProductList productList={productList}/>
        <Image src={'/banner.png'} width={1000} height={300} className="object-contain w-full h-[400px]"/>
        <Footer/>
      </div>
    </main>
  );
}
