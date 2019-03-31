var errorHandler = function errorHandler(cb) {
    return function _handler(e) {
        cb(e.target.error);
    };
};

var noOp = function noOp() {
    return function eff() {
        // Nothing
    };
};

var noOp2 = function noOp2() {
    return noOp;
};

var noOp3 = function noOp3() {
    return noOp2;
};

exports._deleteDatabase = function _deleteDatabase(name) {
    return function aff(error, success) {
        try {
            var request = indexedDB.deleteDatabase(name);

            request.onsuccess = function onSuccess(e) {
                success(e.oldVersion);
            };

            request.onerror = errorHandler(error);
        } catch (e) {
            error(e);
        }

        return function canceler(_, cancelerError) {
            cancelerError(new Error("Can't cancel IDB Effects"));
        };
    };
};

exports._open = function _open(fromMaybe, name, mver, req) {
    var ver = fromMaybe(undefined)(mver);

    return function aff(error, success) {
        try {
            var request = indexedDB.open(name, ver);
            request.onsuccess = function onSuccess(e) {
                success(e.target.result);
            };

            request.onblocked = function onBlocked() {
                fromMaybe(noOp)(req.onBlocked)();
            };

            request.onupgradeneeded = function onUpgradeNeeded(e) {
                var meta = { oldVersion: e.oldVersion };
                // eslint-disable-next-line max-len
                fromMaybe(noOp3)(req.onUpgradeNeeded)(e.target.result)(e.target.transaction)(meta)();
            };

            request.onerror = errorHandler(error);
        } catch (e) {
            error(e);
        }

        return function canceler(_, cancelerError) {
            cancelerError(new Error("Can't cancel IDB Effects"));
        };
    };
};
