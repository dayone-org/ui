import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));

const dependencyVersions = packageJson.dependencies ?? {};
const uiDir = path.join(root, "components/ui");
const uiFiles = readdirSync(uiDir)
  .filter((file) => file.endsWith(".tsx"))
  .sort((a, b) => a.localeCompare(b));

const importPattern = /from\s+["']([^"']+)["']|import\s+["']([^"']+)["']/g;
const uiImportPattern = /^@\/components\/ui\/(.+)$/;
const dependencyImportNames = new Map([
  ["@base-ui/react", "@base-ui/react"],
  ["class-variance-authority", "class-variance-authority"],
  ["cmdk", "cmdk"],
  ["date-fns", "date-fns"],
  ["embla-carousel-react", "embla-carousel-react"],
  ["input-otp", "input-otp"],
  ["lucide-react", "lucide-react"],
  ["radix-ui", "radix-ui"],
  ["react-day-picker", "react-day-picker"],
  ["react-resizable-panels", "react-resizable-panels"],
  ["recharts", "recharts"],
  ["sonner", "sonner"],
  ["vaul", "vaul"],
]);

const themeFiles = [
  {
    path: "registry/globals.css",
    type: "registry:file",
    target: "~/app/globals.css",
  },
  {
    path: "public/fonts/Roobert-Regular.otf",
    type: "registry:file",
    target: "~/public/fonts/Roobert-Regular.otf",
  },
  {
    path: "public/fonts/Roobert-SemiBold.otf",
    type: "registry:file",
    target: "~/public/fonts/Roobert-SemiBold.otf",
  },
];

const fileByName = new Map(
  uiFiles.map((file) => [path.basename(file, ".tsx"), `components/ui/${file}`])
);

function getImports(filePath) {
  const source = readFileSync(path.join(root, filePath), "utf8");
  const imports = [];
  let match;

  while ((match = importPattern.exec(source))) {
    imports.push(match[1] ?? match[2]);
  }

  return imports;
}

function getUiDependencies(filePath, seen = new Set()) {
  if (seen.has(filePath)) {
    return [];
  }

  seen.add(filePath);

  const dependencies = [];

  for (const importPath of getImports(filePath)) {
    const uiMatch = importPath.match(uiImportPattern);

    if (!uiMatch) {
      continue;
    }

    const dependencyName = uiMatch[1];
    const dependencyFile = fileByName.get(dependencyName);

    if (!dependencyFile || dependencyFile === filePath) {
      continue;
    }

    dependencies.push(dependencyFile);
    dependencies.push(...getUiDependencies(dependencyFile, seen));
  }

  return [...new Set(dependencies)].sort((a, b) => a.localeCompare(b));
}

function getPackageDependencies(filePaths) {
  const dependencies = new Set(["tw-animate-css"]);

  for (const filePath of filePaths) {
    for (const importPath of getImports(filePath)) {
      if (importPath === "@/lib/utils") {
        dependencies.add("clsx");
        dependencies.add("tailwind-merge");
      }

      for (const [prefix, dependencyName] of dependencyImportNames) {
        if (importPath === prefix || importPath.startsWith(`${prefix}/`)) {
          dependencies.add(dependencyName);
        }
      }
    }
  }

  return [...dependencies]
    .sort((a, b) => a.localeCompare(b))
    .map((dependency) => {
      const version = dependencyVersions[dependency];
      return version ? `${dependency}@${version}` : dependency;
    });
}

function needsUtils(filePaths) {
  return filePaths.some((filePath) => getImports(filePath).includes("@/lib/utils"));
}

function needsMobileHook(filePaths) {
  return filePaths.some((filePath) =>
    getImports(filePath).includes("@/hooks/use-mobile")
  );
}

function toTitle(name) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildFiles(filePaths) {
  const files = [...themeFiles];

  if (needsUtils(filePaths)) {
    files.push({
      path: "lib/utils.ts",
      type: "registry:lib",
      target: "@lib/utils.ts",
    });
  }

  if (needsMobileHook(filePaths)) {
    files.push({
      path: "hooks/use-mobile.ts",
      type: "registry:hook",
      target: "@hooks/use-mobile.ts",
    });
  }

  for (const filePath of filePaths) {
    files.push({
      path: filePath,
      type: "registry:ui",
      target: `@ui/${path.basename(filePath)}`,
    });
  }

  return files;
}

const primitiveItems = uiFiles.map((file) => {
  const name = path.basename(file, ".tsx");
  const filePath = `components/ui/${file}`;
  const filePaths = [filePath, ...getUiDependencies(filePath)];

  return {
    name,
    type: "registry:ui",
    title: toTitle(name),
    description: `DAYONE ${toTitle(name)} primitive.`,
    dependencies: getPackageDependencies(filePaths),
    files: buildFiles(filePaths),
  };
});

const allFilePaths = uiFiles.map((file) => `components/ui/${file}`);

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "dayone-ui",
  homepage: "https://github.com/dayone-org/dayone-ui",
  items: [
    {
      name: "all",
      type: "registry:item",
      title: "DAYONE UI Primitives",
      description:
        "Complete DAYONE primitive component surface for internal apps.",
      dependencies: getPackageDependencies(allFilePaths),
      files: buildFiles(allFilePaths),
    },
    ...primitiveItems,
  ],
};

writeFileSync(
  path.join(root, "registry.json"),
  `${JSON.stringify(registry, null, 2)}\n`
);
