import Taro, {Component} from "@tarojs/taro"
import AtComponent from "taro-ui/types/base";
import {View} from "@tarojs/components"
import {AtCard} from "taro-ui"

import Picture from "../picture/picture"
import './normal.styl'

export interface ProductListNormalProps extends AtComponent {
  /**
   * 产品列表
   * @default []
   */
  products: string[]
}

class ProductListNormal extends Component<ProductListNormalProps> {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render() {
    const products = this.props.products;

    return (
      <View className={['productList', 'normal'].join('-')}>
        <View className='at-row'>
          {products.map((p, i) => (
              <AtCard
                key={i}
                className='at-col at-col-6'
                note='New!!'
              >
                <Picture
                  key={i}
                  src={p}
                  className={['productList', 'item', 'thumb'].join('-')}
                  mode='widthFix'
                />
              </AtCard>
            )
          )}
        </View>
      </View>
    );
  }
}

export default ProductListNormal

