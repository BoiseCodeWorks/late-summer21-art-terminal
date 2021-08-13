<template>
  <div class="row">
    <!-- REVIEW Options with disparate value and render info -->
    <select v-model="state.selectedColor" @change="logColor">
      <!-- inline object literal -->
      <option v-for="c in colors" :value="c.hex" :key="c.hex">
        {{ c.name }}
      </option>
    </select>
    <ProjectCard v-for="p in projects" :key="p.id" :project="p" />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { logger } from '../utils/Logger'

export default {
  name: 'Thread',
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  setup() {
    const state = reactive({
      selectedColor: ''
    })
    return {
      state,
      colors: [
        { name: 'red', hex: '#ee0b0b' },
        { name: 'green', hex: '#0bee0b' },
        { name: 'blue', hex: '#0f0bee' }
      ],
      logColor() {
        logger.log(state.selectedColor)
      }
    }
  }

}
</script>
