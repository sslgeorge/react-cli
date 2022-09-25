export const style = `
import styled from '@emotion/styled';

export const Container = styled.div\`\`;

`;

export const index = `
export { default as <%= Name %> } from './<%= FileName %>';

`;

export const component = `
import { Container } from './<%= FileName %>.styles';

function <%= Name %>() {
  return <Container>Scooby dooo!</Container>;
}

export default <%= Name %>;

`;
