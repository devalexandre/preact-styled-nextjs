import { h } from 'preact';
import { NextSeo } from 'next-seo'; // then add the `NextSeo` at any `pages/` that you wish

export default (props) => (
  <>
    <NextSeo
      title={props.title}
      description={props.description}
    />
    { props.children }
  </>
);