<template>
  <div>
    <div>
      <header id="header">
        <div class="inner">
          <a href="#" class="image avatar">
            <img width="100%" :src="this.headshots[0]" alt />
          </a>
          <h1
            v-html="
              casting_casting_submission_profile.data
                .casting_casting_submission_profile[0].caption
            "
          ></h1>
        </div>
        <div id="footer">
          <div class="inner">
            <ul class="icons">
              <li>
                <a
                  :href="
                    casting_casting_submission_profile.data
                      .casting_casting_submission_profile[0].twitter_profile
                  "
                  class="icon fa-twitter"
                >
                  <span class="label">Twitter</span>
                </a>
              </li>
              <li>
                <a
                  :href="
                    casting_casting_submission_profile.data
                      .casting_casting_submission_profile[0].facebook_profile
                  "
                  target="_blank"
                  class="icon fa-facebook"
                >
                  <span class="label">Facebook</span>
                </a>
              </li>
              <li>
                <a
                  :href="
                    casting_casting_submission_profile.data
                      .casting_casting_submission_profile[0].twitter_profile
                  "
                  class="icon fa-instagram"
                >
                  <span class="label">Instagram</span>
                </a>
              </li>
              <li>
                <a :href="email" target="_blank" class="icon fa-envelope-o">
                  <span class="label">Email</span>
                </a>
              </li>
            </ul>
            <ul class="copyright">
              <li>&copy; We Are Actors</li>
            </ul>
          </div>
        </div>
      </header>
      <div id="main">
        <section id="one">
          <header class="major">
            <h1>
              {{
                casting_casting_submission_profile.data
                  .casting_casting_submission_profile[0].first_name
              }}
              {{
                casting_casting_submission_profile.data
                  .casting_casting_submission_profile[0].last_name
              }}
            </h1>
            <p
              class="bio"
              v-html="
                casting_casting_submission_profile.data
                  .casting_casting_submission_profile[0].bio
              "
            ></p>
          </header>
          <ul class="actions">
            <li>
              <a :href="resume" target="_blank" class="button">Resume</a>
            </li>
          </ul>
          <!-- <ul class="actions">
            <li>
              <a href="#" class="button">Learn More</a>
            </li>
          </ul> -->
        </section>

        <section id="two">
          <h2>Recent Work</h2>

          <div class="container">
            <div class="imgbox" :key="image" v-for="image in headshots">
              <img :src="image" />
            </div>
          </div>

          <!-- <ul class="actions">
            <li>
              <a href="#" class="button">Full Portfolio</a>
            </li>
          </ul> -->
        </section>

        <section id="three">
          <h2>Demo Reel</h2>
          <div class="videoWrapper" style="--aspect-ratio: 3 / 4">
            <!-- Copy & Pasted from YouTube -->
            <iframe
              width="560"
              height="349"
              :src="demo"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>

          <!-- <ul class="actions">
            <li>
              <a href="#" class="button">Full Portfolio</a>
            </li>
          </ul> -->
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export const GET_PROFILE = gql`
  query GetProfile($user_name: String = "") {
    casting_casting_submission_profile(where: { user_name: { _eq: $user_name } }) {
      bio
      demo_reel_url
      email
      first_name
      headshot_url_1
      headshot_url_2
      headshot_url_3
      headshot_url_4
      last_name
      phone
      resume_url
      user_id
      user_name
      facebook_profile
      ig_profile
      twitter_profile
      caption
    }
  }
`;

export default {
  name: 'GetProfile',
  data() {
    return {
      user_name_param: String(this.$route.path).split('/')[2],
      casting_casting_submission_profile: {},
      headshots: [],
      email: '',
      resume: '',
      demo: '',
    };
  },
  mounted() {
    // eslint-disable-next-line prefer-destructuring
    this.user_name_param = String(this.$route.path).split('/')[2];
    this.query().then(() => {});
  },
  methods: {
    async query() {
      this.casting_casting_submission_profile = await this.$apollo.query({
        query: GET_PROFILE,
        variables: {
          user_name: this.user_name_param,
        },
      });
      console.log(this.casting_casting_submission_profile);
      this.headshots.push(
        this.fixWixUrlsToHttp(
          this.casting_casting_submission_profile.data
            .casting_casting_submission_profile[0].headshot_url_1,
        ),
      );
      this.headshots.push(
        this.fixWixUrlsToHttp(
          this.casting_casting_submission_profile.data
            .casting_casting_submission_profile[0].headshot_url_2,
        ),
      );
      this.headshots.push(
        this.fixWixUrlsToHttp(
          this.casting_casting_submission_profile.data
            .casting_casting_submission_profile[0].headshot_url_3,
        ),
      );
      this.headshots.push(
        this.fixWixUrlsToHttp(
          this.casting_casting_submission_profile.data
            .casting_casting_submission_profile[0].headshot_url_4,
        ),
      );
      this.email = `mailto:${this.casting_casting_submission_profile.data.casting_casting_submission_profile[0].email}`;
      this.resume = this.fixWixUrlsToHttp(
        this.casting_casting_submission_profile.data.casting_casting_submission_profile[0]
          .resume_url,
      );
      this.demo = this.fixVimeoUrl(
        this.casting_casting_submission_profile.data.casting_casting_submission_profile[0]
          .demo_reel_url,
      );
    },
    fixWixUrlsToHttp(url) {
      if (String(url).startsWith('image://v1/')) {
        return `${
          String(url)
            .replace('image://v1/', 'https://static.wixstatic.com/media/')
            .split('.jpg/')[0]
        }.jpg`;
      }
      if (String(url).startsWith('wix:document://v1/')) {
        return `${
          String(url)
            .replace(
              'wix:document://v1/',
              'https://302df7f7-9998-4948-86fa-a129e069e120.usrfiles.com/ugd/',
            )
            .split('.pdf/')[0]
        }.pdf`;
      }
      return url;
    },
    fixVimeoUrl(url) {
      if (String(url).startsWith('https://vimeo.com/')) {
        return `${String(url).replace(
          'https://vimeo.com/',
          'https://player.vimeo.com/video/',
        )}`;
      }
      return url;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/scss/main.scss';
</style>
