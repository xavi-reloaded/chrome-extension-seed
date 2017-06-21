module.exports = function(config) {
    config.set({

        frameworks: ["jasmine", "karma-typescript"],

        files: [
            { pattern: "node_modules/jquery/dist/jquery.js" },
            { pattern: "src/app/**/*.ts" },
            { pattern: "test/unit/**/*.ts" }
        ],

        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },

        reporters: ["mocha", "karma-typescript"],

        browsers: ["Chrome"]
    });
};
