import projectFactory from './Project';

export default function manager() {
  const projects = [];

  function newProject() {
    return projectFactory();
  }

  return {

    get projects() {
      return projects;
    },

    new: function () {
      const project = newProject();

      projects.push(project);

      return project;
    },
  };
}
