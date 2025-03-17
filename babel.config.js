module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // ...cualquier plugin adicional que uses
            'react-native-reanimated/plugin',
        ],
    };
};
