import ApiService from "@/services/api.service";

export default {
  methods: {
    async fetchAPI({ action, data = null }) {
      const url = `/api/${action}`;
      try {
        const response = await ApiService.post(url, data);
        return response.data;
      } catch (error) {
        console.log(error)
        throw error;
      }
    },
  },
};
