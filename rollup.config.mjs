
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";


export default [
  // Main runtime bundle
  {
    input: "src/index.ts",
    output: [
      {
        file: ".tilepadPlugin/bin/index.mjs",
        format: "es",
      },
    ],
    plugins: [
      // Resolve imported modules
      nodeResolve(),
      // Parse and compile typescript
      typescript(),
      // Minify output
      terser({
        format: {
          // Deno extensions can only use ASCII characters
          ascii_only: true,
        },
      }),
    ],
  },

];
