import Taro, {Component} from "@tarojs/taro"
import AtComponent from "taro-ui/types/base";
import {View, Text} from "@tarojs/components"

import Picture from "../picture/picture"
import {classNameBuilder as className} from "../../units/className.helper"
import './normal.styl'
import {ProductDataImpl} from "../../pages/shop/shop";

export interface ProductListNormalProps extends AtComponent {
  /**
   * 产品列表
   * @default []
   */
  products: ProductDataImpl[]
}

class ProductListNormal extends Component<ProductListNormalProps> {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render() {
    //  组件产品列表
    const productsList = this.props.products;
    // 组件样式命名空间
    const classNameSpace = className({names: [['productList']]});
    return (
      <View className={className({names: [[classNameSpace], ['at', 'row'], ['at', 'row', '-wrap']]})}>
        {productsList.map((p, i) => (
          <View
            key={i}
            className={className({names: [['at', 'col'], ['at', 'col', '6']]})}
          >
            <View
              className={className({names: [['at', 'row'], ['at', 'row', '-wrap'], [classNameSpace, 'item']]})}
            >
              {/*图片*/}
              <Picture
                key={i}
                src={p.itemThumb}
                className={className({names: [[classNameSpace, 'item', 'thumb']]})}
              />
              {/*标题*/}
              <Text
                className={className({names: [[classNameSpace, 'item', 'title']]})}
              >{p.title}</Text>
              {/*价钱*/}
              <View className={className({names: [['at', 'row'], [classNameSpace, 'item', 'opts']]})}>
                {p.originPrice ?
                  <View
                    className={className({names: [[classNameSpace, 'item', 'opts', 'origin']]})}
                  >{p.originPrice}</View> : ''
                }
                <View
                  className={className({names: [['at', 'col'], [classNameSpace, 'item', 'opts', 'price']]})}
                >${p.price}</View>
              </View>
              {/*属性区域*/}
              <View className={className({names: [['at', 'row'], [classNameSpace, 'item', 'opts']]})}>
                {Array.isArray(p.labels) ? p.labels.map(label => (
                  <View
                    className={className({names: [['at', 'col'], [classNameSpace, 'item', 'opts', 'label']]})}
                  >{label}</View>
                )) : ''
                }
                <View
                  className={className({names: [['at', 'col'], ['at', 'col', '6'], [classNameSpace, 'item', 'opts', 'labels']]})}
                ></View>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

export default ProductListNormal

