const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(
            __dirname,
            '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
        ),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                omega: {
                    primary: '#00b2ff',
                    secondary: '#0052ff',
                    accent: '#4b5a00',
                    neutral: '#1b292c',
                    'base-100': '#f2ffec',
                    info: '#0097ce',
                    success: '#00af00',
                    warning: '#ff8d00',
                    error: '#ff80a3',
                },
            },
        ],
    },
    plugins: [require('daisyui')],
};
