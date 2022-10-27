/* eslint-disable import/prefer-default-export */
declare interface MenuItem {
  title: string;
  to?: string;
  href?: string;
}

export type Controller = {
  cid: number;
  first_name: string;
  last_name: string;
  operating_initials: string;
  controller_type: string;
  certifications: {
    ground: string;
    major_ground: string;
    local: string;
    major_local: string;
    approach: string;
    major_approach: string;
    enroute: string;
  };
  rating: string;
  status: string;
  roles: string[];
  region: string;
  division: string;
  subdivision: string;
  discord_id: string;
  created_at: string;
  updated_at: string;
};

export type TrainingNote = {
  id: number;
  controller_id: number;
  controller: Controller | null;
  instructor_id: number;
  instructor: Controller | null;

  position: string;
  duration: string;
  session_date: string;
  type: string;
  comments: string;
};

export type { Link } from "@/links";
