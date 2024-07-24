import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        trivia: resolve(__dirname, "src/trivia_game_view/trivia_page.html"),
        login: resolve(__dirname, "src/login/index.html"),
        profile: resolve(__dirname, "src/profile/profile.html"),
        questionary: resolve(__dirname, "src/questionary/questionary.html"),
        main_dashboard: resolve(__dirname, "src/main_Dashboard/home.html"),
      },
    },
  },
});
