/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import React, { CSSProperties } from 'react';
import { Media } from '../../_types';
import { createFromIconfontCN } from '@ant-design/icons';

const styles: Record<string, CSSProperties> = {
  cover: {
    width: '100%', height: '100%',
    margin: 'auto', objectFit: 'contain',
    background: 'transparent',
  },
  icon: {
    padding: 16,
  },
};

export const Icon: React.FC<{ src: string }> = ({ src }) => (
  <img style={{ ...styles.cover, ...styles.icon }} alt="preview" src={src} />
);

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4510853_xbz7m8b5uq.js'
});

export const Preview: React.FC<{ src: string }> = ({ src }) => (
  <img style={styles.cover} alt="preview" src={src} />
);

export default function cover(item: Media) {

  const icons = {
    image: item.link,
    document: 'icon-word',
    sheet: 'icon-sheet',
    slide: 'icon-slide',
    compress: 'icon-compress',
    video: 'icon-video',
    audio: 'icon-audio',
    pdf: 'icon-pdf',
    cad: 'icon-pdf',
    app: 'icon-pdf',
    model: 'icon-pdf',
    unknown: 'icon-unknown',
  }[item.file_type];

  return (item.file_type === 'image')
    ? <Preview src={item.link} />
    : <IconFont className='wis-file-icon' type={icons} style={{ ...styles.cover, ...styles.icon }} />;
}