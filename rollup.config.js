/* eslint env:"node" */

import {version} from './package.json';
const banner = `/**
 * @preserve minnojs-iat-dashboard v${version}
 * @license Apache-2.0 (${(new Date()).getFullYear()})
 */
`;


const config = {
    input: 'src/index.standalone.js',
    output: {
        file: 'index.js',
        format: 'iife', 
        name: 'iatDashboard',
        sourcemap:true,
        banner: banner
    }
};

// at some time we might want to outputs, one as a standalone, one as a plugin
export default [ config ];
