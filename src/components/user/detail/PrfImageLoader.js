import React, { Component } from 'react';

//Based mostly on: https://codepen.io/hartzis/pen/VvNGZP
export default class PrfImageLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            loaded: false
        };
    }

    doSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.imagePreviewUrl);
    }

    cancel(e) {
      e.preventDefault();
      this.props.onSubmit(null);
    }
  
    loadImage(e) {
      e.preventDefault();
      this.setState({loaded:false});

      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          loaded:true
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
        $imagePreview = (
          <div className="prf-nomedia">
          No image Selected
          </div>
        );
      }

      return (
        <div className="card prf-imgloader">
          <form onSubmit={(e)=>this.doSubmit(e)}>
            <div className="form-group prf-file-input">
              <input className='form-control' type="file" onChange={(e)=>this.loadImage(e)} />
            </div>
            {$imagePreview}
            <div className="form-group prf-uploadctrls">
              <button className="btn btn-secondary" type="submit" onClick={(e)=>this.cancel(e)}>Cancel</button>
              {(this.state.loaded)?(
                <button className="btn btn-primary" type="submit" onClick={(e)=>this.doSubmit(e)}>Save this image</button>
              ):null}
            </div>
          </form>
        </div>
      );
    }

}
