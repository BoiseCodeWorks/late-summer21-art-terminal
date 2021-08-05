import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class ProjectsService {
  // NOTE pass in an object to set the queries with key value pairs
  async getAll(query = {}) {
    // NOTE convertToQuery will take an object and turn it into a queryString
    const res = await api.get('api/projects' + convertToQuery(query))
    logger.log(res.data)
    AppState.projects = res.data
  }

  async createProject(project) {
    const res = await api.post('api/projects', project)
    await this.getAll()
  }

  async destroy(id) {
    await api.delete('api/projects/' + id)
    AppState.projects = AppState.projects.filter(p => p.id !== id)
  }
}

export const projectsService = new ProjectsService()
