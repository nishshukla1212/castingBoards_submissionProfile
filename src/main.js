import Vue from 'vue';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import lightbox from '@morioh/v-lightbox';
import Embed from 'v-video-embed';
import store from './store';
import router from './router';
import App from './App.vue';

Vue.use(VueApollo);
Vue.use(lightbox);
Vue.use(Embed);

Vue.config.productionTip = false;

// Create an http link:
const link = new HttpLink({
  uri: 'https://casting-boards.hasura.app/v1/graphql',
  headers: { 'x-hasura-admin-secret': '90bGZjndflKsYuAhHH3UhW1sP9cscP3PB3BYs43k3u3UCIBeh4DOO3w3BeNlcvIB' },
  fetch,
});
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: true,
  }),
});
const apolloProvider = new VueApollo({
  defaultClient: client,
});
new Vue({
  router,
  apolloProvider,
  store,
  render: (h) => h(App),
}).$mount('#app');
