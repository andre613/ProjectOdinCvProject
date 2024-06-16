import { useEffect, useState } from 'react';
import { Button, Col, Form, OverlayTrigger, Row, Tooltip} from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { FaRegSave, FaUndo } from 'react-icons/fa';

interface GeneralInformationData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}

const GeneralInformation: React.FC = () => {
	const [isEditing, setIsEditing] = useState<Boolean>(true);

	const [generalInformation, setGeneralInformation] = useState<GeneralInformationData>({
		firstName: '',
		lastName: '',
		email: '',
		phone: ''
	});

	const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setGeneralInformation((prev) => ({...prev, firstName: e.target.value }));
	};

	const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setGeneralInformation((prev) => ({...prev, lastName: e.target.value }));
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setGeneralInformation((prev) => ({...prev, email: e.target.value }));
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setGeneralInformation((prev) => ({...prev, phone: e.target.value }));
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleDeleteClick = () => {
		localStorage.removeItem('generalInformation');
		setGeneralInformation({
			email: '',
			firstName: '',
			lastName: '',
			phone: ''
		});

		setIsEditing(true);
	}

	const handleSaveClick = () => {
		if(isEditing) {
			const serializedGeneralInformation = JSON.stringify(generalInformation);
			console.log(`Saving General Information: ${serializedGeneralInformation}`);
			localStorage.setItem('generalInformation', serializedGeneralInformation);
		}

		setIsEditing(false);
	};

	const handleCancelClick = () => {
		if(isEditing){
			const serializedGeneralInfo = localStorage.getItem('generalInformation');

			if(serializedGeneralInfo){
				setGeneralInformation(JSON.parse(serializedGeneralInfo));
			}

			setIsEditing(false);
		}
	};

	const saveEnabled = isEditing &&
		generalInformation?.firstName.length &&
		generalInformation?.lastName.length;

	const cancelEnabled = isEditing && localStorage.getItem('generalInformation');

	useEffect(() => {
		const serializedGeneralInformation = localStorage.getItem('generalInformation');

		if(serializedGeneralInformation){
			const generalInformation = JSON.parse(serializedGeneralInformation) as GeneralInformationData;
			setGeneralInformation(generalInformation);
			setIsEditing(false);
		}
	}, []);

	return(
		<>
			{!isEditing &&
				<>
					<Row>
						<Col>
							<h1>{generalInformation.firstName} {generalInformation.lastName}</h1>
						</Col>
					</Row>

					<Row>
						<Col>
							Email: {generalInformation?.email.length? generalInformation.email : 'No email on file'}
						</Col>
					</Row>

					<Row>
						<Col>
							Phone: {generalInformation?.phone.length? generalInformation.phone : 'No phone number on file'}
						</Col>
					</Row>

					<Row style={{paddingTop: '1em', justifyContent: 'right'}}>
						<Col style={{textAlign: 'right'}}>
							<OverlayTrigger
								placement="top"
								overlay={
									<Tooltip id="editButtonToolTip">Edit Your General Information</Tooltip>
								}
							>
								<Button variant="primary" className="btn-sm" onClick={handleEditClick}><BsPencil /></Button>
							</OverlayTrigger>&nbsp;

							<OverlayTrigger
								placement="bottom"
								overlay={
									<Tooltip id="deleteButtonToolTip">Delete Your General Information</Tooltip>
								}
							>
								<Button variant="secondary" className="btn-sm" onClick={handleDeleteClick}><BsTrash /></Button>
							</OverlayTrigger>
						</Col>
					</Row>
				</>
			}

			{isEditing &&
				<>
					<Row>
						<h3>General Information</h3>
					</Row>

					<Row style={{paddingBottom: '1em', textAlign: 'right'}}>
						<Form.Group as={Col} controlId="cvFormSaveGeneralInformation">
							<OverlayTrigger
								placement="top"
								overlay={
									<Tooltip id="saveButtonToolTip">
										{saveEnabled? 'Save Your General Information' : 'First and last name are required to save'}
									</Tooltip>
								}
							>
								<span>
									<Button className="btn-sm" onClick={handleSaveClick} disabled={!saveEnabled}>
										<FaRegSave />
									</Button>
								</span>
							</OverlayTrigger>&nbsp;

							<OverlayTrigger
								placement="bottom"
								overlay={
									<Tooltip id="undoButtonToolTip">
										{cancelEnabled? 'Undo your changes and return to view mode' : 'No general information saved yet.'}
									</Tooltip>
								}
							>
								<span>
									<Button className="btn-sm" variant="secondary" onClick={handleCancelClick} disabled={!cancelEnabled}>
										<FaUndo />
									</Button>
								</span>
							</OverlayTrigger>
						</Form.Group>
					</Row>

					<Row className="mb-3">
						<Form.Group as={Col} controlId="cvFormFirstName">
							<Form.Label>First Name</Form.Label>

							<Form.Control
								type="text"
								value={generalInformation.firstName}
								placeholder="Enter First Name"
								onChange={handleFirstNameChange}
							/>
						</Form.Group>

						<Form.Group  as={Col} controlId="cvFormLastName">
							<Form.Label>Last Name</Form.Label>

							<Form.Control
								type="text"
								value={generalInformation.lastName}
								placeholder="Enter Last Name"
								onChange={handleLastNameChange}
							/>
						</Form.Group>
					</Row>

					<Row>
						<Form.Group as={Col} controlId="cvFormEmail">
							<Form.Label>Email Address</Form.Label>

							<Form.Control
								type="email"
								value={generalInformation.email}
								placeholder="Enter Email Address"
								onChange={handleEmailChange}
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="cvFormPhone">
							<Form.Label>Phone</Form.Label>

							<Form.Control
								type="phone"
								value={generalInformation.phone}
								placeholder="Enter Phone"
								onChange={handlePhoneChange}
							/>
						</Form.Group>
					</Row>
				</>
			}
		</>
	);
};

export default GeneralInformation;