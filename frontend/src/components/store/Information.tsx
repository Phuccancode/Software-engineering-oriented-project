import { InforStore } from './product/InformationStore';
import { Order } from './product/Order';
import { Product } from './product/Product';
import { Promotion } from './product/Promotion';
import { Revenue } from './product/Revenue';


interface InformationProps {
    activeIndex: Number;
}



export const Information = (props: InformationProps) => {
    const { activeIndex } = props;
    {
        switch (activeIndex) {
            case 0:
                return <Revenue />;
            case 2:
                return <Order />;
            case 1:
                return <Product />;
            case 3:
                return <Promotion />;
            default:
                return <InforStore />;
        }
    }
};
