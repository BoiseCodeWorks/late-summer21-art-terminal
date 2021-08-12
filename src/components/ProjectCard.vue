<template>
  <div class="col-12">
    <div class="d-flex mt-2 shadow-light bg-gray border border-light" data-toggle="modal" :data-target="'#project-modal-'+project.id">
      <img class="cover-img" :src="project.imgUrl" alt="" srcset="">
      <div class="d-flex flex-grow-1 justify-content-between">
        <h4 class="py-2 px-3">
          {{ project.title }}
          {{ createdDate }}
        </h4>
        <div class="align-self-end" v-if="account.id === project.creatorId">
          <button class="btn btn-danger" @click.stop="destroy">
            delete
          </button>
        </div>
        <!-- NOTE @click.stop prevents the parent element from being clicked -->
        <router-link router-link :to="{ name: 'Profile', params: {id: project.creator.id } }" @click.stop="" class="creator p-3 align-self-end">
          <img class="h-100 rounded-pill" :src="project.creator.picture" alt="" srcset="">
          {{ project.creator.name }}
        </router-link>
      </div>
    </div>
  </div>
  <ProjectModal :project="project" />
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { projectsService } from '../services/ProjectsService'
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      // REVIEW Conver date to better object see 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat'
      createdDate: computed(() => {
        const d = new Date(props.project.createdAt)
        return new Intl.DateTimeFormat('en-US').format(d)
        // new TimeAgo(d)
      }),
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await projectsService.destroy(props.project.id)
            Pop.toast('Delorted', 'success')
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cover-img {
  height: 200px;
  width: 250px;
  object-fit: cover;
}
a {
  color: inherit;
  text-decoration: inherit;
}
.creator{
  height: 3em;
}
</style>
