declare module '@sentry/react';
declare module 'framer-motion';
declare module 'i18next';
declare module 'react-i18next';
declare module 'react-router-dom';
declare module '@stripe/react-stripe-js';
declare module 'styled-components-helpers';

declare module '*.module.css' {
    const classes: { readonly [key: string]: string }
    export default classes
}

declare module '*.module.scss' {
    const classes: { readonly [key: string]: string }
    export default classes
}

declare module '*.mp3' {
    const src: string
    export default src
}

declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FunctionComponent<
      React.SVGProps<SVGSVGElement>
      >
    const src: string
    export default src
}
declare module '*.png' {
    const src: string
    export default src
}
declare module '*.jpg' {
    const src: string
    export default src
}
