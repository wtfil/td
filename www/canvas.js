(function (jQuery, TD, id) {
  var Canvas = function () {
    this._container = jQuery('#' + id);
    this._stage = new Kinetic.Stage({
      container: id,
      width: this._container.width(),
      height: this._container.height()
    });
    this._addLayers();
    this._loadImages(function () {
      this._showTowers(); 
    }.bind(this));
    this._initEvents();
  };
  Canvas.prototype = {
    _iconWidth: 32,
    _iconHeight: 32,
    _loadImages: function (callback) {
      var images = [],
      image,
        path,
        callbackCounter = 0;
      this._images = {};
      Object.keys(TD.towers).forEach(function (name) {
        path = TD.towers[name].prototype.image;
        if (images.indexOf(path) === -1) {
          images.push(path);
        }
      });
      images.forEach(function (path) {
        this._images[path] = image = new Image();
        image.src = path;
        image.onload = function () {
          if (++callbackCounter === images.length) {
            callback();
          } 
        };
      }.bind(this));
    },
    _resize: function () {
      this._height =  this._canvas[0].height = this._canvas.height();
      this._width = this._canvas[0].width = this._canvas.width();
    },
    _initEvents: function () {
      /*this._layers.drag.on('mouseup', function () {*/
      /*  alert('qew');*/
      /*})*/
    },
    _addLayers: function () {
      this._layers = {};
      this._jLayers = {};
      ['main', 'drag'].forEach(function (name) {
        var layer = new Kinetic.Layer();
        this._layers[name] = layer;
        this._stage.add(layer);
        this._jLayers[name] = jQuery(layer.canvas);
      }.bind(this));
    },
    _showTowers: function () {
      var count = 0,
        width = this._container.width(),
        height = this._container.height();
      Object.keys(TD.towers).forEach(function (name) {
        var Tower = TD.towers[name];
        var image = new Kinetic.Image({
          x: width - this._iconWidth,
          y: this._iconHeight * count++,
          image: this._images[Tower.prototype.image],
          width: this._iconWidth,
          height: this._iconHeight,
        });
        image.on('mousedown', function (e) {
          this._dragStart(image, Tower);
        }.bind(this));
        this._layers.main.add(image);
      }.bind(this));
      this._stage.draw();
    },
    _dragStart: function (image, Tower) {
      var startX = image.x,
        startY = image.y,
        dragOffsetX,
        dragOffsetY;
      var localImage = new Kinetic.Image({
        image: image.image,
        height: image.height,
        width: image.width,
        x: image.x-1,
        y: image.y-1,
        draggable: true
      });
      localImage.on('mouseup', function () {
        this._dragEnd(localImage, Tower);
      }.bind(this));
      localImage.on('mousemove', function (e) {
        dragOffsetX = dragOffsetX || (e.offsetX - startX);
        dragOffsetY = dragOffsetY || (e.offsetY - startY);
        localImage.x = e.offsetX - dragOffsetX;
        localImage.y = e.offsetY - dragOffsetY;
        this._stage.draw();
      }.bind(this));
      this._jLayers.drag.addClass('draggable');
      this._layers.drag.add(localImage);
      this._stage.draw();
    },
    _dragEnd: function (image, Tower) {
      this._jLayers.drag.removeClass('draggable');
      //image.on
      console.log(Tower);
    }
  };
  jQuery(function () {
    new Canvas();
  });
})(jQuery, TD, 'canvas-container');
