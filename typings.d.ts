/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

type CSSModuleClasses = { readonly [key: string]: string }
declare module '*.css' {
  const classes: CSSModuleClasses
  export default classes
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;
  export default ReactComponent
}