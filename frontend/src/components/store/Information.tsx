import { InforStore } from './infor/InformationStore';
import { Boxes } from './order/Boxes';
import { Product } from './product/Product';
import { Promotion } from './promotion/Promotion';
import { Revenue } from './product/Revenue';




export const Information = (props: any) => {
    const { activeIndex, setIsSpinning } = props;
    {
        switch (activeIndex) {
            case 0:
                return <Product
                    setIsSpinning={setIsSpinning}
                />;
            case 1:
                return <Boxes
                    setIsSpinning={setIsSpinning}
                />;
            case 2:
                return <Promotion
                    setIsSpinning={setIsSpinning}
                />;
            default:
                return <InforStore
                    setIsSpinning={setIsSpinning}
                />;
        }
    }
};
