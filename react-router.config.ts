import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
   async prerender() {
    return ["/"];
  },
} satisfies Config;
