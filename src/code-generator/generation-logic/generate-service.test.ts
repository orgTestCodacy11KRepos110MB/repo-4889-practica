import path from "path";
import fsExtra from "fs-extra";

import { generateApp } from "./generate-service";
import generationOptions from "./generation-options";

let defaultDestinationFolder: string;

const createOrEmptyDestinationFolder = async (): Promise<void> => {
  defaultDestinationFolder = path.join(__dirname, "target-folder");
  const doesPathExist = await fsExtra.pathExists(defaultDestinationFolder);
  if (doesPathExist) {
    await fsExtra.emptyDir(defaultDestinationFolder);
  } else {
    await fsExtra.mkdir(defaultDestinationFolder);
  }
};

const getDefaultOptions = (): generationOptions => {
  return {
    targetDirectory: defaultDestinationFolder,
    DBType: "postgres",
    baseFramework: "express",
    mainMicroserviceName: "microservice-1",
    emitBestPracticesHints: true,
  };
};

beforeEach(async () => {
  await createOrEmptyDestinationFolder();
});

describe("generateApp", () => {
  test("When destination does not exist, then the destination folder created and includes content ", async () => {
    // Arrange
    const options = getDefaultOptions();

    // Act
    await generateApp(options);

    // Assert
    const destinationFolderContent = await fsExtra.readdir(options.targetDirectory);
    expect(destinationFolderContent.length).toBeGreaterThan(0);
  });
});
