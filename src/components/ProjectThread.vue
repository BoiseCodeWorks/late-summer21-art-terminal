<template>
  <div class="row">
    <ProjectCard v-for="p in projects" :key="p.id" :project="p" />
  </div>
</template>

<script>
export default {
  name: 'Thread',
  props: {
    projects: {
      type: Array,
      required: true
    }
  }
}
</script>
