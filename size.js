// Original license here
// http://docs.closure-library.googlecode.com/git/closure_goog_math_coordinate.js.source.html

var XMath = require('./math');
var Coordinate = require('./coordinate');

/**
 * Class for representing sizes consisting of a width and height. Undefined
 * width and height support is deprecated and results in compiler warning.
 * @param {number} width Width.
 * @param {number} height Height.
 * @constructor
 */
var Size = function(width, height) {
  /**
   * Width
   * @type {number}
   */
  this.width = width;

  /**
   * Height
   * @type {number}
   */
  this.height = height;
};


/**
 * Compares sizes for equality.
 * @param {Size} a A Size.
 * @param {Size} b A Size.
 * @return {boolean} True iff the sizes have equal widths and equal
 *     heights, or if both are null.
 */
Size.equals = function(a, b) {
  if (a == b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.width == b.width && a.height == b.height;
};


/**
 * @return {!Size} A new copy of the Size.
 */
Size.prototype.clone = function() {
  return new Size(this.width, this.height);
};

/**
 * Returns a new Coordinate object with its position correspoding to the
 * width and height of the Size.
 * @return {!Coordinate} A new Coordinate representation of this Size.
 */
Size.prototype.toCoordinate = function() {
  return new Coordinate(this.width, this.height);
};


/**
 * Creates a new Size object with its dimensions corresponding to the x and y
 * position of coordinate.
 * @param {Coordinate} coordinate A Coordinate.
 * @return {!Size} A new Size initialized with the coordinate's position.
 */
Size.createFromCoordinate = function(coordinate) {
  return new Size(coordinate.x, coordinate.y);
};


/**
 * Returns a nice string representing size.
 * @return {string} In the form (50 x 73).
 * @override
 */
Size.prototype.toString = function() {
  return '(' + this.width + ' x ' + this.height + ')';
};


Size.prototype.toJSON = function() {
  return [this.width, this.height];
};


/**
 * @return {number} The longer of the two dimensions in the size.
 */
Size.prototype.getLongest = function() {
  return Math.max(this.width, this.height);
};


/**
 * @return {number} The shorter of the two dimensions in the size.
 */
Size.prototype.getShortest = function() {
  return Math.min(this.width, this.height);
};


/**
 * @return {number} The area of the size (width * height).
 */
Size.prototype.area = function() {
  return this.width * this.height;
};


/**
 * @return {number} The perimeter of the size (width + height) * 2.
 */
Size.prototype.perimeter = function() {
  return (this.width + this.height) * 2;
};


/**
 * @return {number} The ratio of the size's width to its height.
 */
Size.prototype.aspectRatio = function() {
  return this.width / this.height;
};


/**
 * @return {boolean} True if the size has zero area, false if both dimensions
 *     are non-zero numbers.
 */
Size.prototype.isEmpty = function() {
  return !this.area();
};


/**
 * Clamps the width and height parameters upward to integer values.
 * @return {!Size} This size with ceil'd components.
 */
Size.prototype.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};


/**
 * @param {!Size} target The target size.
 * @return {boolean} True if this Size is the same size or smaller than the
 *     target size in both dimensions.
 */
Size.prototype.fitsInside = function(target) {
  return this.width <= target.width && this.height <= target.height;
};


/**
 * Clamps the width and height parameters downward to integer values.
 * @return {!Size} This size with floored components.
 */
Size.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};


/**
 * Rounds the width and height parameters to integer values.
 * @return {!Size} This size with rounded components.
 */
Size.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};


/**
 * Scales this size by the given scale factors. The width and height are scaled
 * by {@code sx} and {@code opt_sy} respectively.  If {@code opt_sy} is not
 * given, then {@code sx} is used for both the width and height.
 * @param {number} sx The scale factor to use for the width.
 * @param {number=} opt_sy The scale factor to use for the height.
 * @return {!Size} This Size object after scaling.
 */
Size.prototype.scale = function(sx, opt_sy) {
  var sy = XMath.isNumber(opt_sy) ? opt_sy : sx;
  this.width *= sx;
  this.height *= sy;
  return this;
};


/**
 * Uniformly scales the size to fit inside the dimensions of a given size. The
 * original aspect ratio will be preserved.
 *
 * This function assumes that both Sizes contain strictly positive dimensions.
 * @param {!Size} target The target size.
 * @return {!Size} This Size object, after optional scaling.
 */
Size.prototype.scaleToFit = function(target) {
  var s = this.aspectRatio() > target.aspectRatio() ?
      target.width / this.width :
      target.height / this.height;

  return this.scale(s);
};

module.exports = Size;