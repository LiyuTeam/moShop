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
  wh?: number | 0.75
  mode?: keyof ImageProps.mode
}

export interface PictureState {
  loadFinishedClass?: 'load-finished' | ''
}

class Picture extends Component<PictureProps, PictureState> {

  constructor(props: PictureProps) {
    props.mode = props.mode || 'scaleToFill'
    super(props);
    this.state = {loadFinishedClass: ''}
  }

  /**
   * 加载完毕渐入
   * @param e
   */
  loadFinished(e: Event) {
    console.log('pic load finished', e)
    this.setState({loadFinishedClass: 'load-finished'})
  }

  render() {
    const picSrc: string = this.props.src || '';
    const styles = {
      width: this.props.width || '100%',
      height: typeof this.props.height === 'undefined' ?
        'auto' :
        Number.isInteger(this.props.height) ?
          this.props.height as number * (this.props.wh || 1) :
          this.props.height,
      overflow: 'hidden'
    }

    return (
      <Image
        src={picSrc}
        style={styles}
        className={[
          'picture',
          this.props.className || '',
          this.state.loadFinishedClass
        ].join(' ')}
        mode={this.props.mode}
        onLoad={this.loadFinished.bind(this)}
      />
    )
  }
}

export default Picture
