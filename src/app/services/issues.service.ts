
export default class IssuesService {
  getRepositoryIssues = async ({ organization, repository, page }): Promise<any> => {
    try {
      const response: Response = await fetch(`https://api.github.com/repos/${organization}/${repository}/issues?page=${page}`);
      return response.json();
    } catch (error) {
      console.log(error)
    }
  }
}

