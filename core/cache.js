
const clearStorage = function() {
    uni.clearStorageSync();
};

const setStorageSync = function(key, data) {
    uni.setStorageSync(key, data);
};

const getStorageSync = function(key) {
    return uni.getStorageSync(key);
};

const removeStorageSync = function(key) {
    uni.removeStorageSync(key)
};

export { clearStorage, setStorageSync, getStorageSync, removeStorageSync }
