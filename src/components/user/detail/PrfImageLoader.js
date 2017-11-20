import React, { Component } from 'react';

//Based mostly on: https://codepen.io/hartzis/pen/VvNGZP
export default class PrfImageLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
    }

    doSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.imagePreviewUrl);
    }
  
    loadImage(e) {
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
        $imagePreview = null;
      }

      return (
        <div className="card prf-imgloader">
          <form onSubmit={(e)=>this.doSubmit(e)}>
            <div className="form-group">
              <input className='form-control' type="file" onChange={(e)=>this.loadImage(e)} />
            </div>
            {$imagePreview}
            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit" onClick={(e)=>this.doSubmit(e)}>Save this image</button>
            </div>
          </form>
        </div>
      );
    }

}
