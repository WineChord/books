import DefaultTheme from "vitepress/theme";
import "./custom.css";
import ArchitectureMap from "./components/ArchitectureMap.vue";
import ToolPipeline from "./components/ToolPipeline.vue";
import TurnLoopStepper from "./components/TurnLoopStepper.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ArchitectureMap", ArchitectureMap);
    app.component("ToolPipeline", ToolPipeline);
    app.component("TurnLoopStepper", TurnLoopStepper);
  },
};
