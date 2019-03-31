var errorHandler = function errorHandler(cb) {
    return function _handler(e) {
        cb(e.target.error);
    };
};

var successHandler = function successHandler(cb) {
    return function _handler(e) {
        cb(e.target.result);
    };
};

var toArray = function toArray(xs) {
    return Array.prototype.slice.apply(xs);
};


exports._add = function _add(store, value, key) {
    return function aff(error, success) {
        try {
            var request = store.add(value, key || undefined);
            request.onsuccess = successHandler(success);
            request.onerror = errorHandler(error);
        } catch (e) {
            error(e);
        }

        return function canceler(_, cancelerError) {
            cancelerError(new Error("Can't cancel IDB Effects"));
        };
    };
};

exports._autoIncrement = function _autoIncrement(store) {
    return store.autoIncrement;
};

exports._clear = function _clear(store) {
    return function aff(error, success) {
        try {
            var request = store.clear();
            request.onsuccess = successHandler(success);
            request.onerror = errorHandler(error);
        } catch (e) {
            error(e);
        }

        return function canceler(_, cancelerError) {
            cancelerError(new Error("Can't cancel IDB Effects"));
        };
    };
};

exports._createIndex = function _createIndex(store, name, path, params) {
    return function aff(error, success) {
        var keyPath;

        try {
            // NOTE: keyPath supports strings and sequence of strings, however
            //       a string hasn't the same meaning as a sequence of strings
            switch (path.length) {
            case 0:
                keyPath = '';
                break;
            case 1:
                keyPath = path[0];
                break;
            default:
                keyPath = path;
            }

            var index = store.createIndex(name, keyPath, params);
            success(index);
        } catch (e) {
            error(e);
        }

        return function canceler(_, cancelerError) {
            cancelerError(new Error("Can't cancel IDB Effects"));
        };
    };
};

exports._deleteIndex = function _deleteIndex(store, name) {
    return function aff(error, success) {
        try {
            store.deleteIndex(name);
            success();
        } catch (e) {
            error(e);
        }

        return function canceler(_, cancelerError) {
            cancelerError(new Error("Can't cancel IDB Effects"));
        };
    };
};

exports._delete = function _delete(store, query) {
    return function aff(error, success) {
        try {
            var request = store.delete(query);
            request.onsuccess = successHandler(success);
            request.onerror = errorHandler(error);
        } catch (e) {
            error(e);
        }

        return function canceler(_, cancelerError) {
            cancelerError(new Error("Can't cancel IDB Effects"));
        };
    };
};

exports._index = function _index(store, name) {
    return function aff(error, success) {
        try {
            var index = store.index(name);
            success(index);
        } catch (e) {
            error(e);
        }

        return function canceler(_, cancelerError) {
            cancelerError(new Error("Can't cancel IDB Effects"));
        };
    };
};

exports._indexNames = function _indexNames(store) {
    return toArray(store.indexNames);
};

exports._keyPath = function _keyPath(store) {
    var path = store.keyPath;

    if (Array.isArray(path)) {
        return path;
    }

    if (typeof path === 'string') {
        return [path];
    }

    return [];
};

exports._name = function _name(store) {
    return store.name;
};

exports._put = function _put(store, value, key) {
    return function aff(error, success) {
        try {
            var request = store.put(value, key || undefined);
            request.onsuccess = successHandler(success);
            request.onerror = errorHandler(error);
        } catch (e) {
            error(e);
        }

        return function canceler(_, cancelerError) {
            cancelerError(new Error("Can't cancel IDB Effects"));
        };
    };
};

exports._transaction = function _transaction(store) {
    return store.transaction;
};
