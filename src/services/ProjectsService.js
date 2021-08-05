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
}

export const projectsService = new ProjectsService()
