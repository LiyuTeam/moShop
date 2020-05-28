import Taro, {Component} from "@tarojs/taro"
import AtComponent from "taro-ui/types/base";
import {Image} from "@tarojs/components";
import {ImageProps} from "@tarojs/components/types/Image";
import './picture.styl'

export interface PictureProps extends AtComponent {
  className?: string
  src?: string
  width?: number | string
  height?: number | string
  mode?: ImageProps.mode
}

class Picture extends Component<PictureProps> {

  constructor(props: PictureProps) {
    super(props);
    this.state = {loadFinishedClass: ''}
  }

  /**
   * 加载完毕渐入
   * @param e
   */
  loadFinished(e: Event) {
    console.log('pic load finished', e)
    this.setState({loadFinishedClass: 'picture-load-finished'})
  }

  render() {
    const picSrc: string = this.props.src || '';
    const styles = {
      width: this.props.width || '100%',
      height: this.props.height,
      overflow: 'hidden'
    }

    return (
      <Image
        src={picSrc}
        style={styles}
        className={[this.props.className || '', this.state.loadFinishedClass].join(' ')}
        mode={this.props.mode || 'scaleToFill'}
        onLoad={this.loadFinished.bind(this)}
      />
    )
  }
}

export default Picture
