<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h1>Art-Terminal</h1>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'Home' }" class="nav-link">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'About' }" class="nav-link">
            About
          </router-link>
        </li>
      </ul>
      <div class="pr-5 action" data-toggle="modal" data-target="#create-project">
        <span>Create Project</span>
      </div>
      <span class="navbar-text">
        <button
          class="btn btn-outline-primary text-uppercase"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>
        <div class="dropdown" v-else>
          <div
            class="dropdown-toggle"
            @click="state.dropOpen = !state.dropOpen"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded"
            />
            <span class="mx-3">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            :class="{ show: state.dropOpen }"
            @click="state.dropOpen = false"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Account
              </div>
            </router-link>
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
  <!-- Modal -->
  <div class="modal fade"
       id="create-project"
       tabindex="-1"
       role="dialog"
       aria-labelledby="create-project"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            New Project
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createProject">
            <div class="form-group">
              <label class="pr-2" for="title">Title</label>
              <input type="text"
                     id="title"
                     class="form-control"
                     required
                     placeholder="Title..."
                     v-model="state.newProject.title"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="imgUrl">Cover Image</label>
              <input type="text"
                     id="imgUrl"
                     class="form-control"
                     required
                     placeholder="Image Url..."
                     v-model="state.newProject.imgUrl"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="photos">Inspiration Images</label>
              <textarea type="text"
                        id="photos"
                        class="form-control"
                        placeholder="Image Urls..."
                        v-model="state.newProject.photoString"
              ></textarea>
              <small class="text-muted">add many urls seperated by a line break. Current Photos:</small>
              <small>{{ photos }}</small>
            </div>
            <div>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import Pop from '../utils/Notifier'
import { projectsService } from '../services/ProjectsService'
import $ from 'jquery'
export default {
  setup() {
    const state = reactive({
      dropOpen: false,
      newProject: {
        photoString: ''
      }
    })
    return {
      state,
      user: computed(() => AppState.user),
      photos: computed(() => state.newProject.photoString.split('\n')),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      async createProject() {
        try {
          state.newProject.photos = []
          this.photos.forEach(p => {
            if (p) {
              state.newProject.photos.push({ imgUrl: p })
            }
          })
          await projectsService.createProject(state.newProject)
          state.newProject = {
            photoString: ''
          }
          // REVIEW close modal after create
          // $ import from jQuery, the querystring (css selector) of the modal
          $('#create-project').modal('hide')
          // if you want to navigate do so here AFTER closing modal
          Pop.toast('Created!', 'success')
        } catch (e) {
          Pop.toast(e, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
</style>
