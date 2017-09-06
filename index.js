import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  requireNativeComponent,
  ViewPropTypes
} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

class ImageSequence extends Component {
  render() {
    let normalized = this.props.images.map(resolveAssetSource);

    // reorder elements if start-index is different from 0 (beginning)
    if (this.props.startFrameIndex !== 0) {
      normalized = [...normalized.slice(this.props.startFrameIndex), ...normalized.slice(0, this.props.startFrameIndex)];
    }

    return (
      <RCTImageSequence
        {...this.props}
        images={normalized} />
    );
  }
}

ImageSequence.defaultProps = {
  startFrameIndex: 0,
  framesPerSecond: 24,
};

ImageSequence.propTypes = {
  startFrameIndex: PropTypes.number,
  images: PropTypes.array.isRequired,
  framesPerSecond: PropTypes.number
};

const RCTImageSequence = requireNativeComponent('RCTImageSequence', {
  propTypes: {
    ...ViewPropTypes,
    images: PropTypes.arrayOf(PropTypes.shape({
      uri: PropTypes.string.isRequired
    })).isRequired,
    framesPerSecond: PropTypes.number
  },
});

export default ImageSequence;
