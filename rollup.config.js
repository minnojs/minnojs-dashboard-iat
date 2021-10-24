/* eslint env:"node" */

import {version} from './package.json';
const bannerIAT = `/**
 * @preserve minnojs-iat-dashboard v${version}
 * @license Apache-2.0 (${(new Date()).getFullYear()})
 */
`;

const bannerBIAT = `/**
* @preserve minnojs-biat-dashboard v${version}
* @license Apache-2.0 (${(new Date()).getFullYear()})
*/
`;

const bannerSTIAT = `/**
* @preserve minnojs-stiat-dashboard v${version}
* @license Apache-2.0 (${(new Date()).getFullYear()})
*/
`;


const bannerSPF = `/**
* @preserve minnojs-spf-dashboard v${version}
* @license Apache-2.0 (${(new Date()).getFullYear()})
*/
`;

const bannerEP = `/**
* @preserve minnojs-ep-dashboard v${version}
* @license Apache-2.0 (${(new Date()).getFullYear()})
*/
`;

const bannerAMP = `/**
* @preserve minnojs-amp-dashboard v${version}
* @license Apache-2.0 (${(new Date()).getFullYear()})
*/
`;


const configIAT = {
    input: 'src/IAT/iat.index.standalone.js',
    output: {
        file: 'iat_index.js',
        format: 'iife', 
        name: 'iatDashboard',
        sourcemap:true,
        banner: bannerIAT
        }
};

const configBIAT = {
    input: 'src/BIAT/biat.index.standalone.js',
    output: {
        file: 'biat_index.js',
        format: 'iife', 
        name: 'biatDashboard',
        sourcemap:true,
        banner: bannerBIAT
    }
};

const configSTIAT = {
    input: 'src/STIAT/stiat.index.standalone.js',
    output: {
        file: 'stiat_index.js',
        format: 'iife', 
        name: 'stiatDashboard',
        sourcemap:true,
        banner: bannerSTIAT
    }
};

const configSPF = {
    input: 'src/SPF/spf.index.standalone.js',
    output: {
        file: 'spf_index.js',
        format: 'iife', 
        name: 'spfDashboard',
        sourcemap:true,
        banner: bannerSPF
    }
};

const configEP = {
    input: 'src/EP/ep.index.standalone.js',
    output: {
        file: 'ep_index.js',
        format: 'iife', 
        name: 'epDashboard',
        sourcemap:true,
        banner: bannerEP
    }
};

const configAMP = {
    input: 'src/AMP/amp.index.standalone.js',
    output: {
        file: 'amp_index.js',
        format: 'iife', 
        name: 'ampDashboard',
        sourcemap:true,
        banner: bannerAMP
    }
};

// at some time we might want to outputs, one as a standalone, one as a plugin
export default [configIAT, configBIAT, configSTIAT, configSPF, configEP, configAMP];
