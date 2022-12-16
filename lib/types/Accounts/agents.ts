/* eslint-disable @typescript-eslint/no-explicit-any */

export type AgentResponse = Agent[];

export type Agent = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  email: string;
  names: string;
  phone: string;
  role: string;
  enabled: boolean;
  gender: null | string;
  profilePic: null | string;
};

export type PostAgentRequest = {
  names: string;
  email: string;
  phone: string;
  gender: string;
};

export type DeleteAgentRequest = {
  id: any;
};

export type EditAgentLocationRequest = {
  names: string;
  email: string;
  phone: string;
  gender: string;
  id: number;
};

export type GetAgents = {
  page: number | string;
  size: number | string;
};

export type ToggleAgentRequest = {
  id: any;
};

export type ResetPWDAgentRequest = {
  id: any;
};
