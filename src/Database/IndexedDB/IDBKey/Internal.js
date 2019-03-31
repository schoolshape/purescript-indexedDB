exports._dateTimeToForeign = function _dateTimeToForeign(y, m, d, h, mi, s, ms) {
    return new Date(y, m, d, h, mi, s, ms);
};

exports._readDateTime = function _readDateTime(parse, right, left, date) {
    if (Object.getPrototypeOf(date) !== Date.prototype) {
        return left(typeof date);
    }

    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var s = date.getSeconds();
    var ms = date.getMilliseconds();

    var mdate = parse(y)(m)(d)(h)(mi)(s)(ms);

    if (mdate == null) {
        return left(typeof date); // TODO Could return better error
    }

    return right(mdate);
};

exports._unsafeReadDateTime = function _unsafeReadDateTime(parse, date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var s = date.getSeconds();
    var ms = date.getMilliseconds();

    return parse(y)(m)(d)(h)(mi)(s)(ms);
};
