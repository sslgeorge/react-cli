const path = require('node:path');
const { stat, mkdir, writeFile, readFile } = require('node:fs/promises');
const _ = require('lodash');
const { index, style, component } = require('../templates/components');

async function createComponentAction(name) {
  const fileName = _.kebabCase(name);
  const dir = path.resolve(`${__dirname}/src/components/`, fileName);
  const indexFile = path.resolve(dir, 'index.ts');
  const componentFile = path.resolve(dir, `${fileName}.tsx`);
  const styleFile = path.resolve(dir, `${fileName}.styles.ts`);

  try {
    const dirStat = await stat(dir);
  } catch (error) {
    await mkdir(dir, { recursive: true });
  }
  // console.log(dirStat, name);

  const indexTemplate = _.template(index);
  const styleTemplate = _.template(style);
  const componentTemplate = _.template(component);

  const indexContent = indexTemplate({ Name: name, FileName: fileName });
  const styleContent = styleTemplate({ Name: name, FileName: fileName });
  const componentContent = componentTemplate({
    Name: name,
    FileName: fileName,
  });

  await writeFile(indexFile, indexContent);
  await writeFile(styleFile, styleContent);
  await writeFile(componentFile, componentContent);
}

module.exports = createComponentAction;
