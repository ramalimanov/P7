<template>
  <div class="row post mb-5">
    <div class="col-12 col-sm-4 text-center">
      <img
        v-if="post.imageUrl"
        class="img-fluid"
        :src="post.imageUrl"
        alt
      />
      <img v-else :src="imgPlaceholder" alt />
    </div>
    <div class="col-12 col-sm-8">
      <h4>{{ post.title }}</h4>
      <p>{{ post.description }}</p>
    </div>
    <div class="col-12 mt-3">
      <button
        class="btn btn-outline-primary"
        @click="isRead"
        :disabled="this.read"
      >
        Mark as read
      </button>
    </div>
    <div class="col-12">
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  props: ["post", "imgPlaceholder"],
  data() {
    return {
      read: false,
    };
  },
  methods: {
    isRead() {
      this.$api
        .post("/read", {
          postId: this.post.id
        })
        .then(() => {
          this.read = true
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.$api
        .get("/read/" + this.post.id
        )
        .then(() => {
          this.read = true
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

</script>

<style></style>
