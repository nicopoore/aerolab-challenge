import Head from 'next/head';
import React from 'react';

const Meta: React.FC = (): JSX.Element => {
  const metaTitle = 'Aerolab Challenge';
  const metaDesc = 'Aerolab Challenge point rewards store, created by Nicolás Poore';
  const metaUrl = 'https://aerolab-challenge-nicopoore.vercel.app/';
  return (
    <Head>
      <title>{metaTitle}</title>
      <link href="/favicon.svg" rel="icon" />
      <meta content={metaTitle} name="title" />
      <meta content={metaDesc} name="description" />

      <meta content="website" property="og:type" />
      <meta content={metaUrl} property="og:url" />
      <meta content={metaTitle} property="og:title" />
      <meta content={metaDesc} property="og:description" />
      <meta content="/header-x1.png" property="og:image" />

      <meta content="summary_large_image" property="twitter:card" />
      <meta content={metaUrl} property="twitter:url" />
      <meta content={metaTitle} property="twitter:title" />
      <meta content={metaDesc} property="twitter:description" />
    </Head>
  );
};

export default Meta;
