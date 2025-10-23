import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store/Index";
import { fetchProjects } from "../hooks/ProjectSlice";
import ProjectForm from "../project/ProjectForm";
import ProjectCard from "../project/ProjectCard";

const ProjectsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  // select the `project` slice (store reducer key is `project`)
  const projectState = useSelector((state: RootState) => state.project);

  const projects = projectState?.projects ?? [];
  const loading = projectState?.loading ?? false;
  const error = projectState?.error ?? null;

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📁 My Projects</h1>
      <ProjectForm />

      {loading && <p className="text-gray-600 text-center">Loading projects...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map((project: any) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
