module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [], // ✅ شلنا Reanimated مؤقتاً عشان نتجنب ايرور TurboModule
  };
};
