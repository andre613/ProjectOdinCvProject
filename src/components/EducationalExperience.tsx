import moment from 'moment';
import { useEffect, useState } from 'react';
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { FaRegSave, FaUndo } from 'react-icons/fa';
import { RiStickyNoteAddFill } from 'react-icons/ri';

interface EducationalExperienceData {
	schoolName: string;
	titleOfStudy: string;
	graduationDate: Date;
}

interface EducationalExperienceProps {
	isForAdding?: boolean;
	data?: EducationalExperienceData | null;
	saveEducationalExperience: (data: EducationalExperienceData, index: number | null) => void;
	deleteEducationalExperience?: (index: number) => void;
	cancelAdding?: () => void;
	index?: number | null;
	key?: string | null;
}

const EducationalExperience: React.FC<EducationalExperienceProps> = ({
	saveEducationalExperience,
	deleteEducationalExperience,
	cancelAdding,
	data = null,
	isForAdding = false,
	index = null
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(data === null);
	const [newSchoolName, setNewSchoolName] = useState<string>(data? data.schoolName : '');
	const [newTitleOfStudy, setNewTitleOfStudy] = useState<string>(data? data.titleOfStudy : '');

	const [newGraduationDate, setNewGraduationdate] =
		useState<Date>(data? data.graduationDate: new Date());

	const handleNewSchoolNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setNewSchoolName(e.target.value);
	};

	const handleNewTitleOfStudyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setNewTitleOfStudy(e.target.value);
	};

	const handleSaveButtonClick = (): void => {
		saveEducationalExperience({
				graduationDate: newGraduationDate,
				schoolName: newSchoolName,
				titleOfStudy: newTitleOfStudy
			}, 
			index);

		if(isForAdding){
			cancelAdding!();
		}

		setIsEditing(false);
	};

	const handleCancelButtonClick = (): void => {
		if(isForAdding) {
			cancelAdding!();
			setIsEditing(true);
		}
		else {
			setIsEditing(false);
		}
	};

	const handleDeleteButtonClick = (): void => {
		setIsEditing(false);
		deleteEducationalExperience!(index as number);
	};

	const saveEnabled = newSchoolName && newTitleOfStudy && newGraduationDate;

	return (
		<>
			{!isEditing && !isForAdding &&
				<>
					<Row>
						<Col>
							<h4>{newSchoolName}</h4>
						</Col>
						<Col style={{textAlign: 'right'}}>
							<OverlayTrigger
								placement="top"
								overlay={
									<Tooltip id="editButtonToolTip">Edit Educational Experience</Tooltip>
								}
							>
								<Button variant="primary" className="btn-sm" onClick={() => setIsEditing(true)}><BsPencil /></Button>
							</OverlayTrigger>&nbsp;

							<OverlayTrigger
								placement="bottom"
								overlay={
									<Tooltip id="deleteButtonToolTip">Delete Educational Experience</Tooltip>
								}
							>
								<Button variant="secondary" className="btn-sm" onClick={handleDeleteButtonClick}>
									<BsTrash />
								</Button>
							</OverlayTrigger>
						</Col>
					</Row>

					<Row>
						<Col>
							<h5>{newTitleOfStudy}</h5>
						</Col>
					</Row>

					<Row style={{paddingBottom: '1em'}}>
						<Col>
							Graduation date: {moment(newGraduationDate).format('YYYY/MM/DD')}
						</Col>
					</Row>
				</>
			}

			{isEditing &&
				<>
					<Row style={{paddingBottom: '1em'}}>
						<Form.Group as={Col} controlId="schoolName">
							<Form.Label>Institution Name</Form.Label>

							<Form.Control
								type="text"
								value={newSchoolName}
								placeholder="Enter School's Name"
								onChange={handleNewSchoolNameChange}
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="titleOfStudy">
							<Form.Label>Title of Study</Form.Label>

							<Form.Control
								type="text"
								value={newTitleOfStudy}
								placeholder="Enter your Major/Program of Study"
								onChange={handleNewTitleOfStudyChange}
							/>
						</Form.Group>
					</Row>

					<Row style={{paddingBottom: '1em'}}>
						<Form.Group as={Col} controlId="GraduationDate">
							<Form.Label>Graduation Date</Form.Label>
							
							<br />
							
							<DatePicker
								value={moment(newGraduationDate).format('YYYY/MM/DD')}
								showIcon
								toggleCalendarOnIconClick
								dateFormat="yyyy/MM/dd"
								showYearDropdown
								selected={newGraduationDate}
								onChange={(date) => {setNewGraduationdate(date!);}}
							/>
						</Form.Group>
					</Row>

					<Row style={{paddingBottom: '1em'}}>
						<Form.Group as={Col} controlId="saveEducationExperience">
							<OverlayTrigger
								placement="top"
								overlay={
									<Tooltip id="saveButtonToolTip">
										Save Education Experience
									</Tooltip>
								}
							>
								<span>
									<Button className="btn-sm" onClick={handleSaveButtonClick} disabled={!saveEnabled}>
										<FaRegSave />
									</Button>
								</span>
							</OverlayTrigger>&nbsp;

							<OverlayTrigger
								placement="bottom"
								overlay={
									<Tooltip id="undoButtonToolTip">
										Undo your changes
									</Tooltip>
								}
							>
								<span>
									<Button className="btn-sm" variant="secondary" onClick={handleCancelButtonClick}>
										<FaUndo />
									</Button>
								</span>
							</OverlayTrigger>
						</Form.Group>
					</Row>
				</>
			}
		</>
	);
};

const EducationalExperienceList: React.FC = () => {
	const [educationalExperienceItems, setEducationalExperienceItems] = useState<EducationalExperienceData[]>([]);
	const [isAdding, setIsAdding] = useState<boolean>(false);
	
	const handleAddEducationalExperienceClick = () => {
		setIsAdding(true);
	};

	const saveEducationalExperience = (data: EducationalExperienceData, index: number | null = null): void => {
		let newEducationalExperienceItems: EducationalExperienceData[] = [];

		if (index === null) {
			newEducationalExperienceItems = [...educationalExperienceItems, data];
		}
		else {
			newEducationalExperienceItems = [...educationalExperienceItems];
			newEducationalExperienceItems[index] = data;	
		}

		setEducationalExperienceItems(newEducationalExperienceItems);
		localStorage.setItem('educationalExperiences', JSON.stringify(newEducationalExperienceItems));
	};

	const deleteEducationalExperience = (index: number): void => {
		const newEducationalExperienceItems = [... educationalExperienceItems];
		newEducationalExperienceItems.splice(index, 1);
		setEducationalExperienceItems(newEducationalExperienceItems);
		localStorage.setItem('educationalExperiences', JSON.stringify(newEducationalExperienceItems));
	};

	useEffect(() => {
		const serializedEducaitonalExperienceItems = localStorage.getItem('educationalExperiences');
		
		if(serializedEducaitonalExperienceItems) {
			setEducationalExperienceItems(JSON.parse(serializedEducaitonalExperienceItems));
		}
	}, []);

	return(
		<>
			<Row style={{paddingBottom: '1em'}}>
				<Col>
					<h3>Educational Experience</h3>
				</Col>

				<Col style={{textAlign: 'right'}}>
					<OverlayTrigger
						placement="top"
						overlay={
							<Tooltip id="addEducationalExperienceToolTip">Add Educational Experience</Tooltip>
						}
					>
						<Button variant="primary" className="btn-sm" onClick={handleAddEducationalExperienceClick}>
							<RiStickyNoteAddFill />
						</Button>
					</OverlayTrigger>
				</Col>
			</Row>

			{isAdding &&
				<EducationalExperience
					key="addEducationalExperience"
					saveEducationalExperience={saveEducationalExperience}
					isForAdding
					cancelAdding={() => setIsAdding(false)}
				/>
			}

			{
				educationalExperienceItems.length? educationalExperienceItems.map(
					(ee: EducationalExperienceData, index: number) => (
						<EducationalExperience
							key={Math.random().toString()} 
							data={ee}
							index={index} 
							saveEducationalExperience={saveEducationalExperience} 
							deleteEducationalExperience={deleteEducationalExperience}
						/>
					)
				) :

				<Row>
					<Col>
						<p>No Educational Experience On File.</p>
					</Col>
				</Row>
			}
		</>
	);
};

export default EducationalExperienceList;