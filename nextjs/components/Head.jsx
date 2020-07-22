import React from 'react';
import NextHead from 'next/head';

const defaultTitle = 'default title';
const defaultDescription = 'default description';
const defaultKeywords = 'keywords, keywords';
const defaultOGURL = '';
const defaultOGImage = '';

class Head extends React.Component {
  render() {
    const { title, description, keywords, url, ogImage } = this.props;
    return (
      <NextHead>
        <meta charSet="UTF-8" />
        <title>{title || defaultTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1.0 user-scalable=no" />
        <meta name="description" content={description || defaultDescription} />
        <meta name="keywords" content={keywords || defaultKeywords} />
        <link rel="icon" type="image/png" sizes="16x16" href="/default/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/default/favicon-32x32.png" />
        <link rel="shortcut icon" href="/default/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/default/apple-touch-icon.png" />
        <link rel="mask-icon" href="/default/favicon-mask.svg" color="#000000" />
        <meta property="og:url" content={url || defaultOGURL} />
        <meta property="og:title" content={title || ''} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta name="twitter:site" content={url || defaultOGURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage || defaultOGImage} />
        <meta property="og:image" content={ogImage || defaultOGImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </NextHead>
    )
  }
}

export default Head;
