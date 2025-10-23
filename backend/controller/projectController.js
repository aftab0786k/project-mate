import Project from "../modal/projectModel.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    // remove any token accidentally sent in body (Postman mistake)
    const { token: _token, ...payload } = req.body || {};
    console.log("createProject headers:", req.headers);
    console.log("createProject body (payload):", payload);
    console.log("createProject user:", req.user && req.user._id);

    const { title, description, status } = payload || {};

    // basic input validation
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const project = new Project({
      user: req.user._id,
      title: title.trim(),
      description: description || "",
      status: status || "pending",
    });

    const createdProject = await project.save();
    return res.status(201).json(createdProject);
  } catch (error) {
    console.error("createProject error:", error.stack || error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

// Get all projects of logged-in user
export const getUserProjects = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const projects = await Project.find({ user: req.user._id });
    return res.json(projects);
  } catch (error) {
    console.error("getUserProjects error:", error.stack || error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { title, description, status } = req.body || {};
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!req.user || project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (status !== undefined) project.status = status;

    const updated = await project.save();
    return res.json(updated);
  } catch (error) {
    console.error("updateProject error:", error.stack || error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!req.user || project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await project.deleteOne();
    return res.json({ message: "Project removed" });
  } catch (error) {
    console.error("deleteProject error:", error.stack || error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};
