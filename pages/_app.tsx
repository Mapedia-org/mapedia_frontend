import NextApp from 'next/app';
import React from 'react';
import { hotjar } from 'react-hotjar';

import '../public/empty.css';
import '../public/map.css';
import '../public/easymde.css'; // c.f. https://www.npmjs.com/package/react-simplemde-editor -> customized
import '../public/multi-select.css';
import { Wrapper } from '../src/components/Wrapper';
import { withApollo } from '../src/hoc/withApollo';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

if (typeof window !== 'undefined') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });

    // clear cache of service worker
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          return caches.delete(key);
        })
      );
    });
  }
}

interface AppProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

class App extends NextApp<AppProps> {
  componentDidMount() {
    hotjar.initialize(3001220, 6);
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Wrapper apolloClient={apolloClient}>
        <Component {...pageProps} />
      </Wrapper>
    );
  }
}

export default withApollo(App);
