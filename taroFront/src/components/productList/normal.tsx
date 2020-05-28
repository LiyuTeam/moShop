import Taro, {Component} from "@tarojs/taro"
import AtComponent from "taro-ui/types/base";
import {View, Text} from "@tarojs/components"

import Picture from "../picture/picture"
import {classNameBuilder as className} from "../../units/className.helper"
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
        <View className='at-row at-row--wrap'>
          {products.map((p, i) => (
              <View
                key={i}
                className={className({props: [['at', 'col'], ['at', 'col', '6'],]})}
              >
                <View
                  className={className({props: [['at', 'row'], ['at', 'row', '-wrap']]})}
                >
                  <Picture
                    key={i}
                    src={p}
                    className={className({props: [['productList', 'item', 'thumb']]})}
                  />
                  <Text>Price : $99.00</Text>
                </View>
              </View>
            )
          )}
        </View>
      </View>
    );
  }
}

export default ProductListNormal

