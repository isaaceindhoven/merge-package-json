var semver = require("semver");
var intersect = require("@isaac.frontend/semver-set").intersect;
var json = require("jju");
var isBuffer = require("buffer").Buffer.isBuffer;
const _ = require("lodash");

var handlers = {
	// one line text strings
	version: string,
	description: string,

	// Keywords
	keywords: unique,

	// Scripts
	scripts: exists,

	// General dependencies
	dependencies: updateDependencies,
	devDependencies: updateDependencies,
	peerDependencies: updateDependencies,
};

function string(dst, src) {
	return dst ? dst : src;
}

/**
 * [scripts description]
 * @param {Object} dst [description]
 * @param {Object} src [description]
 * @returns {Object}     [description]
 */
function exists(dst, src) {
	return _.assign({}, dst, src);
}

/**
 * Keywords work on an ensure-unique basis: if a keyword already exists in dst
 * then it is skipped, otherwise it is placed at the end of dst; the ordering of
 * keywords in src is preserved.
 * @param {Array} dst [description]
 * @param {Array} src [description]
 * @returns {Array}     [description]
 */
function unique(dst, src) {
	if (_.isEmpty(dst)) {
		return src;
	} else {
		return [].concat(
			dst,
			_.filter(src, function (keyword) {
				return _.contains(dst, keyword);
			})
		);
	}
}

function updateDependencies(dst, src) {
	return _.isEmpty(dst)
		? src
		: _.assign(
				{},
				dst,
				_.mapValues(src, function (version, dep) {
					// We need to check if both are indeed semver ranges in order to do
					// intersects – some may be git urls or other such things.
					var isSem = semver.validRange(version) && semver.validRange(dst[dep]);
					return isSem ? intersect(version, dst[dep]) || version : version;
				})
		  );
}

/**
 * [combine description]
 * @param {Object} dst [description]
 * @param {Object} src [description]
 * @returns {Object} [description]
 */
function combine(dst, src) {
	return _.isEmpty(dst)
		? src
		: _.assign(
				{},
				dst,
				_.mapValues(src, function (value, key) {
					return _.has(handlers, key) ? handlers[key](dst[key], value) : value;
				})
		  );
}

/**
 * [merge description]
 * @param {String|Buffer|Object} dst [description]
 * @param {String|Buffer|Object} src [description]
 * @param {Boolean} isFormatted is true, return the json formatted with 4 indent
 * @returns {String} Result of merging src into dst.
 */
function merge(dst, src, isFormatted) {
	if (_.isString(dst) || isBuffer(dst)) {
		dst = json.parse(dst.toString());
	}
	if (_.isString(src) || isBuffer(src)) {
		src = json.parse(src.toString());
	}

	if (isFormatted) {
		var updatedJson = JSON.parse(
			json.update(JSON.stringify(dst), combine(dst, src), {})
		);
		return JSON.stringify(updatedJson, null, 4);
	} else {
		return json.update(JSON.stringify(dst), combine(dst, src), {});
	}
}

module.exports = merge;
