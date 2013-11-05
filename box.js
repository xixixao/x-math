// Original license here
// http://docs.closure-library.googlecode.com/git/closure_goog_math_box.js.source.html

var Coordinate = require('./coordinate');

/**
 * Class for representing a box. A box is specified as a top, right, bottom,
 * and left. A box is useful for representing margins and padding.
 *
 * @param {number} top Top.
 * @param {number} right Right.
 * @param {number} bottom Bottom.
 * @param {number} left Left.
 * @constructor
 */
var Box = function(top, right, bottom, left) {
  /**
   * Top
   * @type {number}
   */
  this.top = top;

  /**
   * Right
   * @type {number}
   */
  this.right = right;

  /**
   * Bottom
   * @type {number}
   */
  this.bottom = bottom;

  /**
   * Left
   * @type {number}
   */
  this.left = left;
};


/**
 * Creates a Box by bounding a collection of Coordinate objects
 * @param {...Coordinate} var_args Coordinates to be included inside
 *     the box.
 * @return {!Box} A Box containing all the specified Coordinates.
 */
Box.boundingBox = function(var_args) {
  var box = new Box(arguments[0].y, arguments[0].x,
                              arguments[0].y, arguments[0].x);
  for (var i = 1; i < arguments.length; i++) {
    var coord = arguments[i];
    box.top = Math.min(box.top, coord.y);
    box.right = Math.max(box.right, coord.x);
    box.bottom = Math.max(box.bottom, coord.y);
    box.left = Math.min(box.left, coord.x);
  }
  return box;
};


Box.createAtOffset = function(offset, size) {
  return new Box(
    offset.y,
    offset.x + size.width,
    offset.y + size.height,
    offset.x);
}


Box.createAroundCenter = function(center, size) {
  var w = size.width / 2;
  var h = size.height / 2;
  return new Box(center.y - h, center.x + w, center.y + h, center.x - w);
}


/**
 * Returns the top left corner coordinate of the box.
 * @return {!Coordinate} The offset of this rectangle.
 */
Box.prototype.topLeft = function() {
  return new Coordinate(this.left, this.top);
};


/**
 * Returns the top right corner coordinate of the box.
 * @return {!Coordinate} The offset of this rectangle.
 */
Box.prototype.topRight = function() {
  return new Coordinate(this.right, this.top);
};


/**
 * Returns the bottom left corner coordinate of the box.
 * @return {!Coordinate} The offset of this rectangle.
 */
Box.prototype.bottomLeft = function() {
  return new Coordinate(this.left, this.bottom);
};


/**
 * Returns the bottom right corner coordinate of the box.
 * @return {!Coordinate} The offset of this rectangle.
 */
Box.prototype.bottomRight = function() {
  return new Coordinate(this.right, this.bottom);
};


/**
 * Creates a copy of the box with the same dimensions.
 * @return {!Box} A clone of this Box.
 */
Box.prototype.clone = function() {
  return new Box(this.top, this.right, this.bottom, this.left);
};


/**
 * Returns a nice string representing the box.
 * @return {string} In the form (50t, 73r, 24b, 13l).
 * @override
 */
Box.prototype.toString = function() {
  return '(' + this.top + 't, ' + this.right + 'r, ' + this.bottom + 'b, ' +
         this.left + 'l)';
};


Box.prototype.toJSON = function() {
  return [this.top, this.right, this.bottom, this.left];
};


/**
 * Returns whether the box contains a coordinate or another box.
 *
 * @param {Coordinate|Box} other A Coordinate or a Box.
 * @return {boolean} Whether the box contains the coordinate or other box.
 */
Box.prototype.contains = function(other) {
  return Box.contains(this, other);
};


/**
 * Expands box with the given margins.
 *
 * @param {number|Box} top Top margin or box with all margins.
 * @param {number=} opt_right Right margin.
 * @param {number=} opt_bottom Bottom margin.
 * @param {number=} opt_left Left margin.
 * @return {!Box} A reference to this Box.
 */
Box.prototype.expand = function(top, opt_right, opt_bottom,
    opt_left) {
  if (Object.isObject(top)) {
    this.top -= top.top;
    this.right += top.right;
    this.bottom += top.bottom;
    this.left -= top.left;
  } else {
    this.top -= top;
    this.right += opt_right;
    this.bottom += opt_bottom;
    this.left -= opt_left;
  }

  return this;
};


/**
 * Expand this box to include another box.
 * NOTE(user): This is used in code that needs to be very fast, please don't
 * add functionality to this function at the expense of speed (variable
 * arguments, accepting multiple argument types, etc).
 * @param {Box} box The box to include in this one.
 */
Box.prototype.expandToInclude = function(box) {
  this.left = Math.min(this.left, box.left);
  this.top = Math.min(this.top, box.top);
  this.right = Math.max(this.right, box.right);
  this.bottom = Math.max(this.bottom, box.bottom);
};


/**
 * Returns the size of the box.
 * @return {!Size} The size of the box.
 */
Box.prototype.getSize = function() {
  return new Size(this.right - this.left, this.bottom - this.top);
};


/**
 * Returns the area of the box.
 * @return {!Number} The area of the box.
 */
Box.prototype.area = function() {
  return (this.right - this.left) * (this.bottom - this.top);
};


/**
 * Compares boxes for equality.
 * @param {Box} a A Box.
 * @param {Box} b A Box.
 * @return {boolean} True iff the boxes are equal, or if both are null.
 */
Box.equals = function(a, b) {
  if (a == b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.top == b.top && a.right == b.right &&
         a.bottom == b.bottom && a.left == b.left;
};


/**
 * Returns whether a box contains a coordinate or another box.
 *
 * @param {Box} box A Box.
 * @param {Coordinate|Box} other A Coordinate or a Box.
 * @return {boolean} Whether the box contains the coordinate or other box.
 */
Box.contains = function(box, other) {
  if (!box || !other) {
    return false;
  }

  if (other instanceof Box) {
    return other.left >= box.left && other.right <= box.right &&
        other.top >= box.top && other.bottom <= box.bottom;
  }

  // other is a Coordinate.
  return other.x >= box.left && other.x <= box.right &&
         other.y >= box.top && other.y <= box.bottom;
};


/**
 * Returns the relative x position of a coordinate compared to a box.  Returns
 * zero if the coordinate is inside the box.
 *
 * @param {Box} box A Box.
 * @param {Coordinate} coord A Coordinate.
 * @return {number} The x position of {@code coord} relative to the nearest
 *     side of {@code box}, or zero if {@code coord} is inside {@code box}.
 */
Box.relativePositionX = function(box, coord) {
  if (coord.x < box.left) {
    return coord.x - box.left;
  } else if (coord.x > box.right) {
    return coord.x - box.right;
  }
  return 0;
};


/**
 * Returns the relative y position of a coordinate compared to a box.  Returns
 * zero if the coordinate is inside the box.
 *
 * @param {Box} box A Box.
 * @param {Coordinate} coord A Coordinate.
 * @return {number} The y position of {@code coord} relative to the nearest
 *     side of {@code box}, or zero if {@code coord} is inside {@code box}.
 */
Box.relativePositionY = function(box, coord) {
  if (coord.y < box.top) {
    return coord.y - box.top;
  } else if (coord.y > box.bottom) {
    return coord.y - box.bottom;
  }
  return 0;
};


/**
 * Returns the distance between a coordinate and the nearest corner/side of a
 * box. Returns zero if the coordinate is inside the box.
 *
 * @param {Box} box A Box.
 * @param {Coordinate} coord A Coordinate.
 * @return {number} The distance between {@code coord} and the nearest
 *     corner/side of {@code box}, or zero if {@code coord} is inside
 *     {@code box}.
 */
Box.distance = function(box, coord) {
  var x = Box.relativePositionX(box, coord);
  var y = Box.relativePositionY(box, coord);
  return Math.sqrt(x * x + y * y);
};


/**
 * Returns whether two boxes intersect.
 *
 * @param {Box} a A Box.
 * @param {Box} b A second Box.
 * @return {boolean} Whether the boxes intersect.
 */
Box.intersects = function(a, b) {
  return (a.left <= b.right && b.left <= a.right &&
          a.top <= b.bottom && b.top <= a.bottom);
};


/**
 * Returns whether two boxes would intersect with additional padding.
 *
 * @param {Box} a A Box.
 * @param {Box} b A second Box.
 * @param {number} padding The additional padding.
 * @return {boolean} Whether the boxes intersect.
 */
Box.intersectsWithPadding = function(a, b, padding) {
  return (a.left <= b.right + padding && b.left <= a.right + padding &&
          a.top <= b.bottom + padding && b.top <= a.bottom + padding);
};


/**
 * Rounds the fields to the next larger integer values.
 *
 * @return {!Box} This box with ceil'd fields.
 */
Box.prototype.ceil = function() {
  this.top = Math.ceil(this.top);
  this.right = Math.ceil(this.right);
  this.bottom = Math.ceil(this.bottom);
  this.left = Math.ceil(this.left);
  return this;
};


/**
 * Rounds the fields to the next smaller integer values.
 *
 * @return {!Box} This box with floored fields.
 */
Box.prototype.floor = function() {
  this.top = Math.floor(this.top);
  this.right = Math.floor(this.right);
  this.bottom = Math.floor(this.bottom);
  this.left = Math.floor(this.left);
  return this;
};


/**
 * Rounds the fields to nearest integer values.
 *
 * @return {!Box} This box with rounded fields.
 */
Box.prototype.round = function() {
  this.top = Math.round(this.top);
  this.right = Math.round(this.right);
  this.bottom = Math.round(this.bottom);
  this.left = Math.round(this.left);
  return this;
};


/**
 * Translates this box by the given offsets. If a {@code Coordinate}
 * is given, then the left and right values are translated by the coordinate's
 * x value and the top and bottom values are translated by the coordinate's y
 * value.  Otherwise, {@code tx} and {@code opt_ty} are used to translate the x
 * and y dimension values.
 *
 * @param {number|Coordinate} tx The value to translate the x
 *     dimension values by or the the coordinate to translate this box by.
 * @param {number=} opt_ty The value to translate y dimension values by.
 * @return {!Box} This box after translating.
 */
Box.prototype.translate = function(tx, opt_ty) {
  if (tx instanceof Coordinate) {
    this.left += tx.x;
    this.right += tx.x;
    this.top += tx.y;
    this.bottom += tx.y;
  } else {
    this.left += tx;
    this.right += tx;
    if (XMath.isNumber(opt_ty)) {
      this.top += opt_ty;
      this.bottom += opt_ty;
    }
  }
  return this;
};


/**
 * Scales this coordinate by the given scale factors. The x and y dimension
 * values are scaled by {@code sx} and {@code opt_sy} respectively.
 * If {@code opt_sy} is not given, then {@code sx} is used for both x and y.
 *
 * @param {number} sx The scale factor to use for the x dimension.
 * @param {number=} opt_sy The scale factor to use for the y dimension.
 * @return {!Box} This box after scaling.
 */
Box.prototype.scale = function(sx, opt_sy) {
  var sy = XMath.isNumber(opt_sy) ? opt_sy : sx;
  this.left *= sx;
  this.right *= sx;
  this.top *= sy;
  this.bottom *= sy;
  return this;
};

module.exports = Box;
