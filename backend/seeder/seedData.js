import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "../database/db.js";
import { Signup } from "../modal/signup.model.js";
import Project from "../modal/projectModel.js";
import Task from "../modal/taskModel.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Signup.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();
    console.log("🧹 Existing data cleared!");

    // Create one user
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("Test@123", saltRounds);

    const user = await Signup.create({
      username: "testuser",
      email: "test@example.com",
      password: hashedPassword,
    });

    console.log("👤 User created:", user.email);

    // Create 2 projects for this user
    const projects = await Project.insertMany([
      {
        user: user._id,
        title: "Frontend Development",
        description: "Build UI components for the dashboard",
        status: "active",
      },
      {
        user: user._id,
        title: "Backend API Setup",
        description: "Develop Node.js APIs and connect MongoDB",
        status: "active",
      },
    ]);

    console.log("📁 Projects created:", projects.map((p) => p.title));

    // Create 3 tasks per project
    const taskData = [];

    for (const project of projects) {
      for (let i = 1; i <= 3; i++) {
        taskData.push({
          title: `Task ${i} for ${project.title}`,
          description: `Description for task ${i} in ${project.title}`,
          status: i === 3 ? "done" : "in-progress",
          dueDate: new Date(Date.now() + i * 86400000),
          projectId: project._id,
        });
      }
    }

    await Task.insertMany(taskData);
    console.log("✅ 3 tasks created per project");

    console.log("\n🎉 Database successfully seeded!");
    process.exit();
  } catch (error) {
    console.error("❌ Error while seeding:", error.message);
    process.exit(1);
  }
};

seedData();
