<template>
  <div class="home">
    <GetProfile/>
  </div>
</template>

<script>
// @ is an alias to /src
import GetProfile from '@/components/GetProfile.vue';

export default {
  name: 'Home',
  components: {
    GetProfile,
  },
};
</script>
