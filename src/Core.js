exports.toArray = function toArray(xs) {
    return Array.prototype.slice.apply(xs);
};

exports.noOp = function noOp() {
    return function eff() {
        // Nothing
    };
};

exports.noOp2 = function noOp2() {
    return exports.noOp;
};

exports.errorHandler = function errorHandler(cb) {
    return function _handler(e) {
        cb(new Error(e.target.error.name));
    };
};

exports.eventHandler = function eventHandler(cb) {
    return function _handler(e) {
        cb(e.target.result)();
    };
};

exports._showIDBDatabase = function _showIDBDatabase(db) {
    return '(IDBDatabase ' +
        '{ name: ' + db.name +
        ', objectStoreNames: [' + exports.toArray(db.objectStoreNames).join(',') + ']' +
        ', version: ' + db.version +
        ' })';
};