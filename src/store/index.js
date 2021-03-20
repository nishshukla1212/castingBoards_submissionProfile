import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profie: {
      user_name: "",
      user_id: "",
      first_name: "",
      last_name: "",
      firstName: "",
      email: "",
      phone: "",
      bio: "",
      headshot_url_1: "",
      headshot_url_2: "",
      headshot_url_3: "",
      headshot_url_4: "",
      resume_url: "",
      demo_reel_url: "",
      caption: "",
      facebook_profile: "",
      ig_profile: "",
      twitter_profile: ""
    },
    headshots: [],
  },
  mutations: {
    addProfile(state, profile) {
      state.profile = profile
    },
    addHeadshot(state, headshot) {
      state.headshots.push(headshot);
    },
  },
  actions: {
  },
  modules: {
  },
});
