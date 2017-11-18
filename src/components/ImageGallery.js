import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import Lightbox from 'react-images';

class ImageGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightboxIsOpen: false,
            currentImage: 0
        }
    }
    openLightbox = (index, event) => {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true,
            backdropClosesModal: true
        });
    }

    closeLightbox = () => {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    }

    goToPrevious = () => {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    }

    goToNext = () => {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    }

    gotoImage = (index) => {
        this.setState({
            currentImage: index,
        });
    }

    handleClickImage = () => {
        if (this.state.currentImage === this.props.images.length - 1) {
            return;
        }
        this.gotoNext();
    }

    renderGallery() {
        const { images } = this.props;
        console.log(images);

        if (!images) {
            return;
        }

        //Map each item in the images array to an array of html elements:
        const gallery = images.map(function (obj, index) {
            return (
                <a
                    href={obj.src}
                    className={css(classes.thumbnail, classes[obj.orientation])}
                    key={index}
                    onClick={(e) => this.openLightbox(index, e)}
                >
                    <img src={obj.src} className={css(classes.source)} alt="" />
                </a>
            );
        });

        return (
            <div className={css(classes.gallery)}>
                {/* <div> */}
                {gallery}
            </div>
        );
    }

    render() {
        return (
            <div className="section">
                {this.renderGallery()}
                <Lightbox
                    backdropClosesModal={this.state.backdropClosesModal}
                    currentImage={this.state.currentImage}
                    images={this.props.images}
                    isOpen={this.state.lightboxIsOpen}
                    onClickImage={this.handleClickImage}
                    onClickNext={this.gotoNext}
                    onClickPrev={this.gotoPrevious}
                    onClickThumbnail={this.gotoImage}
                    onClose={this.closeLightbox}
                    showThumbnails={this.props.showThumbnails}
                    theme={this.props.theme}
                />
            </div>
        )
    }
}

const gutter = {
    small: 2,
    large: 4,
};

const classes = StyleSheet.create({
    gallery: {
        marginRight: -gutter.small,
        overflow: 'hidden',

        '@media (min-width: 500px)': {
            marginRight: -gutter.large,
        },
    },

    // anchor
    thumbnail: {
        boxSizing: 'border-box',
        display: 'block',
        float: 'left',
        lineHeight: 0,
        paddingRight: gutter.small,
        paddingBottom: gutter.small,
        overflow: 'hidden',

        '@media (min-width: 500px)': {
            paddingRight: gutter.large,
            paddingBottom: gutter.large,
        },
    },

    // orientation
    landscape: {
        width: '30%',
    },
    square: {
        paddingBottom: 0,
        width: '40%',

        '@media (min-width: 500px)': {
            paddingBottom: 0,
        },
    },

    // actual <img />
    source: {
        border: 0,
        display: 'block',
        height: 'auto',
        maxWidth: '100%',
        width: 'auto',
    },
});

export default ImageGallery;