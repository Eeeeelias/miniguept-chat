import {styled} from "solid-styled-components"
import { ThemeToggle } from "./components";
import { Searchbar } from './Searchbar';
import { ThemeProvider } from "./theme";

const Wrapper = styled.div`
	${(props) => `
		height: 100%;
		width: 100%;
		padding: ${props.theme?.().space.largest};
		padding-top: ${props.theme?.().space.medium};
		background-color: ${props.theme?.().color.bg.base};
		color: ${props.theme?.().color.fg.base};
	`}
`

const Layout = styled.div`
	${(props) => `
		max-width: 1000px;
		max-height: 100%;
		margin: 0 auto;
		background-color: ${props.theme?.().color.bg.base};
	`}
`

export const App = () => (
	<ThemeProvider>
		<Wrapper>
			<Layout>
				<ThemeToggle/>
				<Searchbar />
			</Layout>
		</Wrapper>
	</ThemeProvider>
);
