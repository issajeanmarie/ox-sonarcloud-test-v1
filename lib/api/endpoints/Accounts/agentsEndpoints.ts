import {
  Agent,
  AgentResponse,
  DeleteAgentRequest,
  EditAgentLocationRequest,
  GetAgents,
  PostAgentRequest,
  ResetPWDAgentRequest,
  ToggleAgentRequest
} from "../../../types/Accounts/agents";
import { ApiResponseMetadata } from "../../../types/shared";
import { baseAPI } from "../../api";

/**
 * AgentS ENDPOINTS
 * @author  Patrick TUNEZERWANE
 * @authorEmail tunezepatrick@awesomity.rw
 * @since sep 25
 */

const agentsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    agents: builder.query<
      ApiResponseMetadata<{ content: AgentResponse }>,
      GetAgents
    >({
      providesTags: ["Agents"],
      query: (DTO) => ({
        url: `agents?page=${DTO?.page || ""}&size=${DTO?.size || ""}`,
        method: "GET"
      })
    }),
    postAgent: builder.mutation<ApiResponseMetadata<Agent>, PostAgentRequest>({
      invalidatesTags: ["Agents"],
      query: (DTO) => ({
        url: `/agents`,
        method: "POST",
        body: DTO
      })
    }),

    deleteAgent: builder.mutation<
      ApiResponseMetadata<Agent>,
      DeleteAgentRequest
    >({
      invalidatesTags: ["Agents"],
      query: (DTO) => ({
        url: `/agents/${DTO?.id}`,
        method: "DELETE"
      })
    }),
    editAgent: builder.mutation<
      ApiResponseMetadata<Agent>,
      EditAgentLocationRequest
    >({
      invalidatesTags: ["Agents"],
      query: (DTO) => ({
        url: `/agents/${DTO?.id}`,
        method: "PATCH",
        body: DTO
      })
    }),
    toggleAgent: builder.mutation<
      ApiResponseMetadata<Agent>,
      ToggleAgentRequest
    >({
      invalidatesTags: ["Agents"],
      query: (DTO) => ({
        url: `/agents/${DTO?.id}/toggle-active`,
        method: "PATCH",
        body: DTO
      })
    }),
    sendResetPWDToAgent: builder.mutation<
      ApiResponseMetadata<Agent>,
      ResetPWDAgentRequest
    >({
      invalidatesTags: ["Agents"],
      query: (DTO) => ({
        url: `/agents/${DTO?.id}/reset-password`,
        method: "POST",
        body: DTO
      })
    })
  })
});

export const {
  useAgentsQuery,
  usePostAgentMutation,
  useDeleteAgentMutation,
  useEditAgentMutation,
  useToggleAgentMutation,
  useLazyAgentsQuery,
  useSendResetPWDToAgentMutation
} = agentsEndpoints;
