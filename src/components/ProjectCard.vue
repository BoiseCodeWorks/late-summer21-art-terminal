<template>
  <div class="col-12">
    <div class="row mt-2 shadow border border-light p-3" data-toggle="modal" :data-target="'#project-modal-'+project.id">
      <div class="col-6 cover-img p-0 mb-4">
        <img class="img-fluid" :src="project.imgUrl" alt="" srcset="">
      </div>
      <div class="col-6 ">
        <div class="row justify-content-center align-items-center project-title">
          <h4 class="border py-2 px-3 text-center">
            {{ project.title }}
          </h4>
        </div>
        <div class="row p-0  project-creator align-items-end pb-1">
          <!-- NOTE @click.stop prevents the parent element from being clicked -->
          <router-link :to="{ name: 'Profile', params: {id: project.creator.id } }" @click.stop="">
            <div class="col-10 text-right pr-0">
              {{ project.creator.name }}
            </div>
            <div class="col-2 creator-img">
              <img class="img-fluid rounded-pill" :src="project.creator.picture" alt="" srcset="">
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <ProjectModal :project="project" />
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
