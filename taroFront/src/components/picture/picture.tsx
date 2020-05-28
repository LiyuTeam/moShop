import Taro, {Component} from "@tarojs/taro"
import AtComponent from "taro-ui/types/base";
import {View, Image} from "@tarojs/components";

export interface PictureProps extends AtComponent {
  className: string
  src: string
  width?: number
  height?: number
  mode?: string | 'widthFix'
}

class Picture extends Component<PictureProps> {

  render() {
    const picSrc: string = this.props.src || '';
    const styles = {
      width: this.props.width||'100%',
      height: this.props.height,
      overflow: 'hidden'
    }
    console.log(styles)

    return (
      <View
        style={styles}
      >
        <Image
          src={picSrc}
        />
      </View>
    )
  }
}

export default Picture
