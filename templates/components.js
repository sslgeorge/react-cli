exports.style = `
import styled from '@emotion/styled';

export const Container = styled.div\`\`;

`;

exports.index = `
export { default as <%= Name %> } from './<%= FileName %>';

`;

exports.component = `
import { Container } from './<%= FileName %>.styles';

function <%= Name %>() {
  return <Container>Scooby dooo!</Container>;
}

export default <%= Name %>;

`;
