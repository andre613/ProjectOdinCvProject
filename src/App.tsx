import { Container, Form } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

import './App.css';
import GeneralInformation from './components/GeneralInformation'
import EducationalExperienceList from './components/EducationalExperience';

const App: React.FC = () => (
	<Container fluid
		className="bg-dark text-light"
		data-bs-theme="dark"
		style={{height: '100vh'}}
		>
			<h2>CV App</h2><br />

			<Form id="cvForm">
				<GeneralInformation />
				<hr />
				<EducationalExperienceList />
			</Form>
	</Container>
	);

export default App;