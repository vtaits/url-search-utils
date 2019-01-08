module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": ["eslint:recommended", "airbnb-base"],
    "parser": "babel-eslint",
    "plugins": [
        "jest"
    ],
    "rules": {
        "no-plusplus": "off",
        "no-nested-ternary": "off",
    }
};
