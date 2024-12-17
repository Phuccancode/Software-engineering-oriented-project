import { ProductGird } from "../components/products/ProductGrid"


const HomePage = (props: any) => {
    const { setIsSpinning } = props;


    return (
        <>
            <ProductGird
                setIsSpinning={setIsSpinning}
            />
        </>
    )
}

export default HomePage
