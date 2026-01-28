"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  projects: Project[];
  columns?: 2 | 3 | 4;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const columnClasses = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export function ProjectGrid({ projects, columns = 3 }: ProjectGridProps) {
  return (
    <motion.div
      className={cn("grid grid-cols-1 gap-8", columnClasses[columns])}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {projects.map((project, index) => (
        <motion.div key={project.id} variants={itemVariants}>
          <ProjectCard project={project} priority={index < 3} />
        </motion.div>
      ))}
    </motion.div>
  );
}
