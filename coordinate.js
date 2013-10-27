// Original license here
// http://docs.closure-library.googlecode.com/git/closure_goog_math_coordinate.js.source.html

var XMath = require('./math');

/**
 * Class for representing coordinates and positions.
 * @param {number=} opt_x Left, defaults to 0.
 * @param {number=} opt_y Top, defaults to 0.
 * @constructor
 */
var Coordinate = function(opt_x, opt_y) {
  /**
   * X-value
   * @type {number}
   */
  this.x = opt_x || 0;

  /**
   * Y-value
   * @type {number}
   */
  this.y = opt_y || 0;
};


/**
 * Returns a new copy of the coordinate.
 * @return {!Coordinate} A clone of this coordinate.
 */
Coordinate.prototype.clone = function() {
  return new Coordinate(this.x, this.y);
};


/**
 * Returns a nice string representing the coordinate.
 * @return {string} In the form (50, 73).
 * @override
 */
Coordinate.prototype.toString = function() {
  return '(' + this.x + ', ' + this.y + ')';
};

Coordinate.prototype.toJSON = function() {
  return [this.x, this.y];
};


/**
 * Compares coordinates for equality.
 * @param {Coordinate} a A Coordinate.
 * @param {Coordinate} b A Coordinate.
 * @return {boolean} True iff the coordinates are equal, or if both are null.
 */
Coordinate.equals = function(a, b) {
  if (a == b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.x == b.x && a.y == b.y;
};


/**
 * Returns the distance between two coordinates.
 * @param {!Coordinate} a A Coordinate.
 * @param {!Coordinate} b A Coordinate.
 * @return {number} The distance between {@code a} and {@code b}.
 */
Coordinate.distance = function(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};


/**
 * Returns the magnitude of a coordinate.
 * @param {!Coordinate} a A Coordinate.
 * @return {number} The distance between the origin and {@code a}.
 */
Coordinate.magnitude = function(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
};


/**
 * Returns the angle from the origin to a coordinate.
 * @param {!Coordinate} a A Coordinate.
 * @return {number} The angle, in degrees, clockwise from the positive X
 *     axis to {@code a}.
 */
Coordinate.azimuth = function(a) {
  return XMath.angle(0, 0, a.x, a.y);
};


/**
 * Returns the squared distance between two coordinates. Squared distances can
 * be used for comparisons when the actual value is not required.
 *
 * Performance note: eliminating the square root is an optimization often used
 * in lower-level languages, but the speed difference is not nearly as
 * pronounced in JavaScript (only a few percent.)
 *
 * @param {!Coordinate} a A Coordinate.
 * @param {!Coordinate} b A Coordinate.
 * @return {number} The squared distance between {@code a} and {@code b}.
 */
Coordinate.squaredDistance = function(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return dx * dx + dy * dy;
};


/**
 * Returns the difference between two coordinates as a new
 * Coordinate.
 * @param {!Coordinate} a A Coordinate.
 * @param {!Coordinate} b A Coordinate.
 * @return {!Coordinate} A Coordinate representing the difference
 *     between {@code a} and {@code b}.
 */
Coordinate.difference = function(a, b) {
  return new Coordinate(a.x - b.x, a.y - b.y);
};


/**
 * Returns the sum of two coordinates as a new Coordinate.
 * @param {!Coordinate} a A Coordinate.
 * @param {!Coordinate} b A Coordinate.
 * @return {!Coordinate} A Coordinate representing the sum of the two
 *     coordinates.
 */
Coordinate.sum = function(a, b) {
  return new Coordinate(a.x + b.x, a.y + b.y);
};


/**
 * Rounds the x and y fields to the next larger integer values.
 * @return {!Coordinate} This coordinate with ceil'd fields.
 */
Coordinate.prototype.ceil = function() {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);
  return this;
};


/**
 * Rounds the x and y fields to the next smaller integer values.
 * @return {!Coordinate} This coordinate with floored fields.
 */
Coordinate.prototype.floor = function() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this;
};


/**
 * Rounds the x and y fields to the nearest integer values.
 * @return {!Coordinate} This coordinate with rounded fields.
 */
Coordinate.prototype.round = function() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this;
};


/**
 * Translates this box by the given offsets. If a {@code Coordinate}
 * is given, then the x and y values are translated by the coordinate's x and y.
 * Otherwise, x and y are translated by {@code tx} and {@code opt_ty}
 * respectively.
 * @param {number|Coordinate} tx The value to translate x by or the
 *     the coordinate to translate this coordinate by.
 * @param {number=} opt_ty The value to translate y by.
 * @return {!Coordinate} This coordinate after translating.
 */
Coordinate.prototype.translate = function(tx, opt_ty) {
  if (tx instanceof Coordinate) {
    this.x += tx.x;
    this.y += tx.y;
  } else {
    this.x += tx;
    if (XMath.isNumber(opt_ty)) {
      this.y += opt_ty;
    }
  }
  return this;
};


/**
 * Scales this coordinate by the given scale factors. The x and y values are
 * scaled by {@code sx} and {@code opt_sy} respectively.  If {@code opt_sy}
 * is not given, then {@code sx} is used for both x and y.
 * @param {number} sx The scale factor to use for the x dimension.
 * @param {number=} opt_sy The scale factor to use for the y dimension.
 * @return {!Coordinate} This coordinate after scaling.
 */
Coordinate.prototype.scale = function(sx, opt_sy) {
  var sy = XMath.isNumber(opt_sy) ? opt_sy : sx;
  this.x *= sx;
  this.y *= sy;
  return this;
};

// Originally in Vec2
// http://docs.closure-library.googlecode.com/git/closure_goog_math_vec2.js.source.html

/**
 * @return {!Coordinate} A random unit-length vector.
 */
Coordinate.randomUnit = function() {
  var angle = Math.random() * Math.PI * 2;
  return new Coordinate(Math.cos(angle), Math.sin(angle));
};


/**
 * @return {!Coordinate} A random vector inside the unit-disc.
 */
Coordinate.random = function() {
  var mag = Math.sqrt(Math.random());
  var angle = Math.random() * Math.PI * 2;

  return new Coordinate(Math.cos(angle) * mag, Math.sin(angle) * mag);
};


/**
 * @return {!Coordinate} A random vector with x and y between 0 and 1.
 */
Coordinate.randomPositive = function() {
  return new Coordinate(Math.random(), Math.random());
};


/**
 * @return {!Coordinate} A new vector with the same coordinates as this one.
 * @override
 */
Coordinate.prototype.clone = function() {
  return new Coordinate(this.x, this.y);
};


/**
 * Returns the magnitude of the vector measured from the origin.
 * @return {number} The length of the vector.
 */
Coordinate.prototype.magnitude = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};


/**
 * Returns the squared magnitude of the vector measured from the origin.
 * NOTE(brenneman): Leaving out the square root is not a significant
 * optimization in JavaScript.
 * @return {number} The length of the vector, squared.
 */
Coordinate.prototype.squaredMagnitude = function() {
  return this.x * this.x + this.y * this.y;
};


/**
 * Reverses the sign of the vector. Equivalent to scaling the vector by -1.
 * @return {!Coordinate} The inverted vector.
 */
Coordinate.prototype.invert = function() {
  this.x = -this.x;
  this.y = -this.y;
  return this;
};


/**
 * Normalizes the current vector to have a magnitude of 1.
 * @return {!Coordinate} The normalized vector.
 */
Coordinate.prototype.normalize = function() {
  return this.scale(1 / this.magnitude());
};


/**
 * Adds another vector to this vector in-place.
 * @param {!Coordinate} b The vector to add.
 * @return {!Coordinate}  This vector with {@code b} added.
 */
Coordinate.prototype.add = function(b) {
  this.x += b.x;
  this.y += b.y;
  return this;
};


/**
 * Subtracts another vector from this vector in-place.
 * @param {!Coordinate} b The vector to subtract.
 * @return {!Coordinate} This vector with {@code b} subtracted.
 */
Coordinate.prototype.subtract = function(b) {
  this.x -= b.x;
  this.y -= b.y;
  return this;
};


/**
 * Multiplies each value of this vector with corresponding value of another
 * vector.
 * @param {!Coordinate} b The vector to multiply with.
 * @return {!Coordinate} This vector with {@code b} multiplied with.
 */
Coordinate.prototype.multiply = function(b) {
  this.x *= b.x;
  this.y *= b.y;
  return this;
};


/**
 * Rotates this vector in-place by a given angle, specified in radians.
 * @param {number} angle The angle, in radians.
 * @return {!Coordinate} This vector rotated {@code angle} radians.
 */
Coordinate.prototype.rotate = function(angle) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var newX = this.x * cos - this.y * sin;
  var newY = this.y * cos + this.x * sin;
  this.x = newX;
  this.y = newY;
  return this;
};


/**
 * Rotates a vector by a given angle, specified in radians, relative to a given
 * axis rotation point. The returned vector is a newly created instance - no
 * in-place changes are done.
 * @param {!Coordinate} v A vector.
 * @param {!Coordinate} axisPoint The rotation axis point.
 * @param {number} angle The angle, in radians.
 * @return {!Coordinate} The rotated vector in a newly created instance.
 */
Coordinate.rotateAroundPoint = function(v, axisPoint, angle) {
  var res = v.clone();
  return res.subtract(axisPoint).rotate(angle).add(axisPoint);
};


/**
 * Compares this vector with another for equality.
 * @param {!Coordinate} b The other vector.
 * @return {boolean} Whether this vector has the same x and y as the given
 *     vector.
 */
Coordinate.prototype.equals = function(b) {
  return this == b || !!b && this.x == b.x && this.y == b.y;
};


/**
 * Sets each value of this coordinate to min of the value and the
 * corresponding one in given coordinate.
 * @param {!Coordinate} b A coordinate.
 * @return {!Coordinate} This coordinate as a minimal coordinate combination
 *     with b.
 */
Coordinate.prototype.min = function(b) {
  this.x = Math.min(this.x, b.x);
  this.y = Math.min(this.y, b.y);
  return this;
};


/**
 * Sets each value of this coordinate to max of the value and the
 * corresponding one in given coordinate.
 * @param {!Coordinate} b The second coordinate.
 * @return {!Coordinate} This coordinate as a maximal coordinate combination
 *     with b.
 */
Coordinate.prototype.max = function(b) {
  this.x = Math.max(this.x, b.x);
  this.y = Math.max(this.y, b.y);
  return this;
};


/**
 * Clamps this coordinate within the provided bounds.
 * @param {!Coordinate} min The minimum coordinates to return.
 * @param {!Coordinate} max The maximum coordinates to return.
 * @return {!Coordinate} This coordinate within bounds or
 *     clamped to the nearest coordinate within the bounds.
 */
Coordinate.prototype.clamp = function(min, max) {
  this.x = Math.min(Math.max(this.x, min.x), max.x);
  this.y = Math.min(Math.max(this.y, min.y), max.y);
  return this;
};


/**
 * Returns the dot-product of two vectors.
 * @param {!Coordinate} a The first vector.
 * @param {!Coordinate} b The second vector.
 * @return {number} The dot-product of the two vectors.
 */
Coordinate.dot = function(a, b) {
  return a.x * b.x + a.y * b.y;
};


/**
 * Returns a new Vec2 that is the linear interpolant between vectors a and b at
 * scale-value x.
 * @param {!Coordinate} a Vector a.
 * @param {!Coordinate} b Vector b.
 * @param {number} x The proportion between a and b.
 * @return {!Coordinate} The interpolated vector.
 */
Coordinate.lerp = function(a, b, x) {
  return new Coordinate(XMath.lerp(a.x, b.x, x),
                        XMath.lerp(a.y, b.y, x));
};


/**
 * Takes two coordinates and returns a new coordinate with x and y set to
 * max of the originals' x and y.
 * @param {!Coordinate} a The first coordinate.
 * @param {!Coordinate} b The second coordinate.
 * @return {!Coordinate} A maximal coordinate combination of a and b.
 */
Coordinate.max = function(a, b) {
  return new Coordinate(Math.max(a.x, b.x),
                        Math.max(a.y, b.y));
};


/**
 * Takes two coordinates and returns a new coordinate with x and y set to
 * min of the originals' x and y.
 * @param {!Coordinate} a The first coordinate.
 * @param {!Coordinate} b The second coordinate.
 * @return {!Coordinate} A minimal coordinate combination of a and b.
 */
Coordinate.min = function(a, b) {
  return new Coordinate(Math.min(a.x, b.x),
                        Math.min(a.y, b.y));
};


/**
 * Takes a coordinate and clamps it to within the provided bounds.
 * @param {!Coordinate} a The input coordinate.
 * @param {!Coordinate} min The minimum coordinates to return.
 * @param {!Coordinate} max The maximum coordinates to return.
 * @return {!Coordinate} The input coordinate if it is within bounds, or
 *     the nearest coordinate within the bounds.
 */
Coordinate.clamp = function(a, min, max) {
  return new Coordinate(Math.min(Math.max(a.x, min.x), max.x),
                        Math.min(Math.max(a.y, min.y), max.y));
};


module.exports = Coordinate;
