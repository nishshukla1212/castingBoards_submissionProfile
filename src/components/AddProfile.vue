<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form enctype="multipart/form-data" @submit.prevent="handleSubmit(goToProfilePage)">
        <ValidationProvider name="FirstName" rules="required" v-slot="{ errors }">
          <input
            type="text"
            class="text-field"
            name="first_name"
            id="first_name"
            v-model="first_name"
            placeholder="First Name"
          />
          <p class="error">{{ errors[0] }}</p>
        </ValidationProvider>
        <ValidationProvider name="LastName" rules="required" v-slot="{ errors }">
          <input
            type="text"
            class="text-field"
            name="last_name"
            id="last_name"
            v-model="last_name"
            placeholder="Last Name"
          />
          <p class="error">{{ errors[0] }}</p>
        </ValidationProvider>

        <ValidationProvider
          name="Phone"
          rules="required|length:10|numeric"
          v-slot="{ errors }"
        >
          <input
            type="tel"
            class="text-field"
            name="phone"
            id="phone"
            v-model="phone"
            placeholder="Phone"
          />
          <p class="error">{{ errors[0] }}</p>
        </ValidationProvider>
        <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
          <input
            type="email"
            class="text-field"
            name="email"
            id="email"
            v-model="email"
            placeholder="Email"
          />
          <p class="error">{{ errors[0] }}</p>
        </ValidationProvider>
        <ValidationProvider name="Bio" rules="required" v-slot="{ errors }">
          <textarea
            rows="8"
            style="width: 308px; margin-top: 30px; margin-bottom: 15px"
            class="BioTextBox"
            name="bio"
            id="bio"
            v-model="bio"
            placeholder="Write a short bio"
          />
          <p class="error">{{ errors[0] }}</p>
        </ValidationProvider>
        <div style="margin-bottom: 15px">
          <input
            type="text"
            class="text-field"
            name="caption"
            id="caption"
            v-model="caption"
            placeholder="Caption"
          />
        </div>

        <div style="margin-bottom: 15px">
          <input
            type="text"
            class="text-field"
            name="demo-reel"
            id="demo-reel"
            v-model="demo_reel_url"
            placeholder="Demo Reel"
          />
        </div>

        <div style="margin-bottom: 15px">
          <input
            type="text"
            class="text-field"
            name="facebook_profile"
            id="facebook_profile"
            v-model="facebook_profile"
            placeholder="Facebook URL"
          />
        </div>

        <div style="margin-bottom: 15px">
          <input
            type="text"
            class="text-field"
            name="twitter_profile"
            id="twitter_profile"
            v-model="twitter_profile"
            placeholder="Twitter URL"
          />
        </div>
        <div style="margin-bottom: 15px">
          <input
            type="text"
            class="text-field"
            name="ig_profile"
            id="ig_profile"
            v-model="ig_profile"
            placeholder="Instagram URL"
          />
        </div>

        <dropzone id="headshots"></dropzone>
        <button :disabled="invalid">
          <div class="continue btn">
            <span class="continue-text">Submit</span>
          </div>
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import Dropzone from "./Dropzone";
import { required, email, length, numeric } from "vee-validate/dist/rules";
import uniqid from "uniqid";
import gql from "graphql-tag";
export const ADD_PROFILE = gql`
  mutation ADD_PROFILE($object: casting_casting_submission_profile_insert_input!) {
    insert_casting_casting_submission_profile_one(object: $object) {
      user_name
    }
  }
`;
export const GET_PROFILE = gql`
  query GET_PROFILE($user_name: String_comparison_exp = {}) {
    casting_casting_submission_profile(where: { user_name: $user_name }) {
      bio
      caption
      demo_reel_url
      email
      facebook_profile
      first_name
      headshot_url_1
      headshot_url_2
      headshot_url_3
      headshot_url_4
      ig_profile
      last_name
      phone
      resume_url
      twitter_profile
      user_id
      user_name
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UPDATE_PROFILE(
    $bio: String
    $demo_reel_url: String
    $caption: String
    $email: String
    $facebook_profile: String
    $first_name: String
    $headshot_url_1: String
    $headshot_url_2: String
    $headshot_url_3: String
    $headshot_url_4: String
    $ig_profile: String
    $last_name: String
    $phone: String
    $resume_url: String
    $twitter_profile: String
    $user_id: String
    $user_name: String
  ) {
    update_casting_casting_submission_profile_by_pk(
      pk_columns: { email: $email, user_id: $user_id, user_name: $user_name }
      _set: {
        bio: $bio
        caption: $caption
        demo_reel_url: $demo_reel_url
        email: $email
        facebook_profile: $facebook_profile
        first_name: $first_name
        headshot_url_1: $headshot_url_1
        headshot_url_2: $headshot_url_2
        headshot_url_3: $headshot_url_3
        headshot_url_4: $headshot_url_4
        ig_profile: $ig_profile
        last_name: $last_name
        phone: $phone
        resume_url: $resume_url
        twitter_profile: $twitter_profile
        user_id: $user_id
        user_name: $user_name
      }
    ) {
      user_name
    }
  }
`;

extend("required", {
  ...required,
  message: "This field is required",
});

// Add the email rule
extend("email", {
  ...email,
  message: "This field must be a valid email",
});

extend("length", {
  ...length,
  message: "This field must be 10 digits",
});
extend("numeric", {
  ...numeric,
  message: "This field must be numeric",
});

export default {
  data() {
    return {
      user_name: this.$route.query.id,
      user_id: uniqid().toString(),
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
      twitter_profile: "",
      picturesArray: [],
      resumeArray: [],
      profile: {},
      response: {},
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
    Dropzone,
  },
  mounted() {
    this.initStoreData(this.user_name);
  },
  methods: {
    async initStoreData(user_name) {
      this.profile = await this.$apollo
        .mutate({
          mutation: GET_PROFILE,
          variables: {
            "user_name": { "_eq": user_name },
          },
        })
        .catch((res) => {
          console.log(res);
        });
      console.log(this.profile);

      if (
        this.profile.data.casting_casting_submission_profile[0].user_name[0].length > 0
      ) {
        (this.user_id = this.profile.data.casting_casting_submission_profile[0].user_id
          ? this.profile.data.casting_casting_submission_profile[0].user_id
          : ""),
          (this.first_name = this.profile.data.casting_casting_submission_profile[0]
            .first_name
            ? this.profile.data.casting_casting_submission_profile[0].first_name
            : ""),
          (this.last_name = this.profile.data.casting_casting_submission_profile[0]
            .last_name
            ? this.profile.data.casting_casting_submission_profile[0].last_name
            : ""),
          (this.email = this.profile.data.casting_casting_submission_profile[0].email
            ? this.profile.data.casting_casting_submission_profile[0].email
            : ""),
          (this.phone = this.profile.data.casting_casting_submission_profile[0].phone
            ? this.profile.data.casting_casting_submission_profile[0].phone
            : ""),
          (this.bio = this.profile.data.casting_casting_submission_profile[0].bio
            ? this.profile.data.casting_casting_submission_profile[0].bio
            : ""),
          (this.headshot_url_1 = this.profile.data.casting_casting_submission_profile[0]
            .headshot_url_1
            ? this.profile.data.casting_casting_submission_profile[0].headshot_url_1
            : ""),
          (this.headshot_url_2 = this.profile.data.casting_casting_submission_profile[0]
            .headshot_url_2
            ? this.profile.data.casting_casting_submission_profile[0].headshot_url_2
            : ""),
          (this.headshot_url_3 = this.profile.data.casting_casting_submission_profile[0]
            .headshot_url_3
            ? this.profile.data.casting_casting_submission_profile[0].headshot_url_3
            : ""),
          (this.headshot_url_4 = this.profile.data.casting_casting_submission_profile[0]
            .headshot_url_4
            ? this.profile.data.casting_casting_submission_profile[0].headshot_url_4
            : ""),
          (this.resume_url = this.profile.data.casting_casting_submission_profile[0]
            .resume_url
            ? this.profile.data.casting_casting_submission_profile[0].resume_url
            : ""),
          (this.demo_reel_url = this.profile.data.casting_casting_submission_profile[0]
            .demo_reel_url
            ? this.profile.data.casting_casting_submission_profile[0].demo_reel_url
            : ""),
          (this.caption = this.profile.data.casting_casting_submission_profile[0].caption
            ? this.profile.data.casting_casting_submission_profile[0].caption
            : ""),
          (this.facebook_profile = this.profile.data.casting_casting_submission_profile[0]
            .facebook_profile
            ? this.profile.data.casting_casting_submission_profile[0].facebook_profile
            : ""),
          (this.ig_profile = this.profile.data.casting_casting_submission_profile[0]
            .ig_profile
            ? this.profile.data.casting_casting_submission_profile[0].ig_profile
            : ""),
          (this.twitter_profile = this.profile.data.casting_casting_submission_profile[0]
            .twitter_profile
            ? this.profile.data.casting_casting_submission_profile[0].twitter_profile
            : "");
      }
    },
    async goToProfilePage() {
      // separate pictures from document
      this.picturesArray = this.$store.state.headshots.filter(
        (element) =>
          element.length > 0 &&
          (String(element).toLowerCase().includes(".jpg") ||
            String(element).toLowerCase().includes(".jpeg") ||
            String(element).toLowerCase().includes(".png")),
      );
      this.resumeArray = this.$store.state.headshots.filter(
        (element) =>
          element.length > 0 &&
          (String(element).toLowerCase().includes(".pdf") ||
            String(element).toLowerCase().includes(".docx") ||
            String(element).toLowerCase().includes(".doc")),
      );
      this.headshot_url_1 = this.picturesArray[0];
      this.headshot_url_2 = this.picturesArray[1];
      this.headshot_url_3 = this.picturesArray[2];
      this.headshot_url_4 = this.picturesArray[3];
      this.resume_url = this.resumeArray[0];

      let request_object = {
        user_name: this.user_name,
        user_id: this.user_id,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone: this.phone,
        bio: this.bio,
        headshot_url_1: this.headshot_url_1,
        headshot_url_2: this.headshot_url_2,
        headshot_url_3: this.headshot_url_3,
        headshot_url_4: this.headshot_url_4,
        resume_url: this.resume_url,
        demo_reel_url: this.demo_reel_url,
        caption: this.caption,
        facebook_profile: this.facebook_profile,
        ig_profile: this.ig_profile,
        twitter_profile: this.twitter_profile,
      };
      if (this.profile.data.casting_casting_submission_profile[0].user_name.length > 0) {
        this.response = await this.$apollo
          .mutate({
            mutation: UPDATE_PROFILE,
            variables: {
              bio: this.bio,
              caption: this.caption,
              demo_reel_url: this.demo_reel_url,
              email: this.email,
              facebook_profile: this.facebook_profile,
              first_name: this.first_name,
              headshot_url_1: this.headshot_url_1,
              headshot_url_2: this.headshot_url_2,
              headshot_url_3: this.headshot_url_3,
              headshot_url_4: this.headshot_url_4,
              ig_profile: this.ig_profile,
              last_name: this.last_name,
              phone: this.phone,
              resume_url: this.resume_url,
              twitter_profile: this.twitter_profile,
              user_id: this.user_id,
              user_name: this.user_name,
            },
          })
          .catch((res) => {
            console.log(res);
          });
        if (
          this.response.data.update_casting_casting_submission_profile_by_pk[0]
            .affected_rows.length
        ) {
          this.$router.push({ path: "/profile" + this.username });
        }
      } else {
        this.response = await this.$apollo
          .mutate({
            mutation: ADD_PROFILE,
            variables: {
              object: request_object,
            },
          })
          .catch((res) => {
            console.log(res);
          });
        if (
          this.response.data.insert_casting_casting_submission_profile_one[0].user_name
            .length
        ) {
          this.$router.push({ path: "/profile" + this.username });
        }
      }
    },
  },
};
</script>

<style lang="scss">
input.text-field {
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  width: 315px;
  height: 20px;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  font-size: 16px;
  padding: 1%;
  /* white */

  background: #ffffff;
  /* gray/300 */

  border: 1px solid #d4d4d8;
  box-sizing: border-box;
  border-radius: 4px;
}
p.error {
  color: #f55842;
  font-size: medium;
  text-align: center;
  font: nunito;
  margin-top: 0;
}
</style>
