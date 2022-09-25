import chalk from 'chalk';
import _ from 'lodash';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { component, index, style } from '../templates/components.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createComponentAction(input) {
  const name = path.basename(input);
  const inputDir = path.dirname(input);

  const fileName = _.kebabCase(name);
  const dirName = _.kebabCase(inputDir);

  const dir = path.resolve(`${__dirname}/src/components/`, dirName, fileName);
  const indexFile = path.resolve(dir, 'index.ts');
  const componentFile = path.resolve(dir, `${fileName}.tsx`);
  const styleFile = path.resolve(dir, `${fileName}.styles.ts`);

  try {
    await stat(dir);
  } catch (error) {
    await mkdir(dir, { recursive: true });
  }

  const indexTemplate = _.template(index);
  const styleTemplate = _.template(style);
  const componentTemplate = _.template(component);

  const componentName = _.capitalize(name);

  const indexContent = indexTemplate({
    Name: componentName,
    FileName: fileName,
  });
  const styleContent = styleTemplate({
    Name: componentName,
    FileName: fileName,
  });
  const componentContent = componentTemplate({
    Name: componentName,
    FileName: fileName,
  });

  await writeFile(indexFile, indexContent);
  await writeFile(styleFile, styleContent);
  await writeFile(componentFile, componentContent);

  console.log(chalk.green('Component created successfully! in '), dir);
}

export default createComponentAction;
