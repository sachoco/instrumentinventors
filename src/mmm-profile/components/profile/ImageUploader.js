
export default class imageUploader {

  constructor(handleChange) {
    this.handleChange = handleChange;
    this.mediaImage = null;
  }

  open(fieldName, key = 0, state = null) {
    if (!(wp.media instanceof Function)) {
      return;
    }
    const $this = this;
    if (this.mediaImage) {
      this.mediaImage.open();
      return;
    }
    this.mediaImage = wp.media({
      library: {
        type: "image",
      },
      multiple: false,
    });
    this.mediaImage.on("select", function () {
      var image = $this.mediaImage.state().get("selection").first().toJSON();
      console.log(image);
      document.querySelector(".media-modal-close").click();
      $this.handleImageChange(image, fieldName, key, state);
    });

    this.mediaImage.open();
  }

  handleImageChange(_image, fieldName, key, state){
    let new_array;
    if (["slideshow", "stories"].includes(fieldName)) {
      let imageObj = {
        id: _image.id,
        url:
          fieldName == "slideshow"
            ? _image.sizes.large.url
            : _image.sizes.medium.url,
      };
      if (!state) {
        new_array = [{ image: imageObj }];
      } else {
        if (key == -1) {
          new_array = [...state, { image: imageObj }];
        } else {
          new_array = [...state];
          new_array[key] = { image: imageObj };
        }
      }
    } else if (fieldName == "profile_picture") {
      new_array = {
        id: _image.id,
        url: _image.sizes.thumbnail.url,
      };
    } else {
      return false;
    }
    this.handleChange({
      target: {
        name: fieldName,
        value: new_array,
      },
    });
  };

}







//
//
//
// BACKUP "Original function format"
// // const editImage = (prop, key = 0) => {
//   if (!(wp.media instanceof Function)) {
//     return;
//   }
//
//   if (mediaImage) {
//     mediaImage.open();
//     return;
//   }
//   var mediaImage = wp.media({
//     library: {
//       type: "image",
//     },
//     multiple: false,
//   });
//   mediaImage.on("select", function () {
//     var image = mediaImage.state().get("selection").first().toJSON();
//     console.log(image);
//     document.querySelector(".media-modal-close").click();
//     handleImageChange(image, prop, key);
//
//   });
//
//   mediaImage.open();
// };
//
// const handleImageChange = (_image, prop, key) => {
//   let url = _image.sizes.full.url;
//
//   if (["slideshow", "stories"].includes(prop)) {
//     // url = image.sizes.medium.url;
//     let new_array;
//     let imageObj = {
//       id: _image.id,
//       url:
//         prop == "slideshow"
//           ? _image.sizes.large.url
//           : _image.sizes.medium.url,
//     };
//     if (!state[prop]) {
//       new_array = [{ image: imageObj }];
//     } else {
//       if (key == -1) {
//         new_array = [...state[prop], { image: imageObj }];
//       } else {
//         new_array = [...state[prop]];
//         new_array[key] = { image: imageObj };
//       }
//     }
//     setState({
//       ...state,
//       [prop]: new_array,
//     });
//   } else {
//     if (prop == "profile_picture") {
//       url = _image.sizes.thumbnail.url;
//     }
//     setState({
//       ...state,
//       [prop]: {
//         id: _image.id,
//         url: url,
//       },
//     });
//   }
// };
