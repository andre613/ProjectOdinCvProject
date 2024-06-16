import { Container, Form } from 'react-bootstrap'

import './App.css';
import GeneralInformation from './components/GeneralInformation'

const App: React.FC = () => (
	<Container fluid
		className="bg-dark text-light"
		data-bs-theme="dark"
		style={{height: '100vh'}}
		>
			<h2>CV App</h2><br />

			<Form id="cvForm">
				<GeneralInformation />
			</Form>
	</Container>
	);

export default App;